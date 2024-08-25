import logging
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter 

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

DATA_PATH = 'data/'
DB_FAISS_PATH = 'vectorstore_faiss/db'

# Create vector database
def create_vector_db():
    logger.info("Starting vector database creation process")

    logger.info(f"Loading PDF documents from {DATA_PATH}")
    loader = DirectoryLoader(
        path=DATA_PATH,
        glob='*.pdf',
        loader_cls=PyPDFLoader
    )

    documents = loader.load()
    logger.info(f"Loaded {len(documents)} documents")
    
    logger.info("Splitting documents into chunks")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    logger.info(f"Created {len(texts)} text chunks")

    logger.info("Initializing embedding model")
    embed_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )

    logger.info("Creating FAISS index")
    db = FAISS.from_documents(texts, embed_model)
    
    logger.info(f"Saving FAISS index to {DB_FAISS_PATH}")
    db.save_local(DB_FAISS_PATH)

    logger.info("Vector database creation completed successfully")

if __name__ == "__main__":
    try:
        create_vector_db()
        logger.info("Script executed successfully")
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}", exc_info=True)