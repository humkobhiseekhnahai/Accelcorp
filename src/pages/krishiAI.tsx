import Gemini from "../utils/lib/gemini";

export const KrishiAI = () => {
  return (
    <div>KrishiAI
      <button onClick={async () => {
        await Gemini("how are you");
       
      }}>
        get data
      </button>
    </div>
  );
};