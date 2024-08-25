from fastapi import FastAPI, HTTPException, status, Request, Form, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
import uvicorn
import json
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import torch
import logging
import traceback
from fastapi.middleware.cors import CORSMiddleware

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DB_FAISS_PATH = 'vectorstore_faiss/db'

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure templates
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load model and tokenizer
model_name = "google/flan-t5-large"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer, device=0)

def build_chain():
    try:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}
        )
        db = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
        return db
    except Exception as e:
        logger.error(f"Error in build_chain: {str(e)}")
        raise

def truncate_text(text, max_tokens=450):
    tokens = tokenizer.encode(text, add_special_tokens=False)
    if len(tokens) > max_tokens:
        tokens = tokens[:max_tokens]
        text = tokenizer.decode(tokens)
    return text

def query_model(prompt: str):
    try:
        truncated_prompt = truncate_text(prompt, max_tokens=900)
        response = generator(truncated_prompt, max_length=250, num_return_sequences=1, do_sample=True, temperature=0.7)
        generated_text = response[0]['generated_text']

        if not generated_text.endswith(('.', '!', '?')):
            last_sentence_end = max(generated_text.rfind('.'), generated_text.rfind('!'), generated_text.rfind('?'))

            if last_sentence_end != -1:
                generated_text = generated_text[:last_sentence_end + 1]
            else:
                generated_text += '.'

        return generated_text.strip()
    except Exception as e:
        logger.error(f"Error in query_model: {str(e)}")
        logger.error(traceback.format_exc())
        return "I'm sorry, but I encountered an error while trying to generate a response. Please try again later."
    
def run_chain(db, prompt: str):
    try:
        docs = db.similarity_search(prompt, k=2)
        context = "\n".join([doc.page_content for doc in docs])
        
        full_prompt = f"""Using the following context, provide information related to the question. If there's no direct answer, summarize relevant information from the context.

Context:
{context}

Question: {prompt}

Answer:"""
        
        result = query_model(full_prompt)
        
        if "I don't have enough information" in result:
            result = f"While I don't have a direct answer, here's some related information from the documents: {result}"
        
        return result, docs
    except Exception as e:
        logger.error(f"Error in run_chain: {str(e)}")
        logger.error(traceback.format_exc())
        return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.", []

chain = build_chain()

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})

@app.post("/chat_response")
async def chat_response(request: Request, prompt: str = Form(...)):
    try:
        logger.info(f"Received prompt: {prompt}")
        result, docs = run_chain(chain, prompt)
        logger.info(f"Generated result: {result}")
        
        source_documents_list = [doc.metadata.get('source', 'Unknown') for doc in docs]
        page_number_list = [doc.metadata.get('page', 1) for doc in docs]

        snippets = []
        for doc in docs:
            snippet = doc.page_content[:100] + "..."
            snippets.append(snippet)

        response_data = {
            "answer": result,
            "source_documents_list": source_documents_list,
            "page_number_list": page_number_list,
            "snippets": snippets
        }
        logger.info(f"Sending response: {response_data}")
        return Response(content=json.dumps(response_data), media_type="application/json")
    except Exception as e:
        logger.error(f"Error in chat_response: {str(e)}")
        logger.error(traceback.format_exc())
        error_response = {
            "answer": "I apologize, but an error occurred while processing your request. Please try again later.",
            "source_documents_list": [],
            "page_number_list": [],
            "snippets": []
        }
        return Response(content=json.dumps(error_response), media_type="application/json")

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host='localhost',
        port=8000,
        reload=True,
    )