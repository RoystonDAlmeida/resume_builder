from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

# Get the Groq API key from the environment variables
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("Error: GROQ_API_KEY environment variable not set.")
    groq_enabled = False
else:
    groq_enabled = True

# Initialize the ChatGroq model
try:
    chat_model = ChatGroq(model="llama3-70b-8192", temperature=0.7, groq_api_key=GROQ_API_KEY)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that predicts the next word in a sentence."),
        ("user", "{input}")
    ])
    chain = prompt | chat_model  # Chain the prompt and model
    print("ChatGroq model loaded successfully!")
except Exception as e:
    print(f"Error loading ChatGroq model: {e}")
    chat_model = None
    groq_enabled = False

@app.route('/predict', methods=['POST'])
def predict():
    if not groq_enabled:
        return jsonify({'error': 'Groq API key is not configured or model failed to load'}), 500

    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'Text is required'}), 400

    try:
        # Use Langchain to interact with Groq
        response = chain.invoke({"input": text})
        # Extract predicted word (first word of response, or entire response)
        predicted_word = response.content.split()[0]
        return jsonify({'predictions': [predicted_word]})
    except Exception as e:
        print(f"ChatGroq Error: {e}")
        return jsonify({'error': 'Failed to generate prediction using ChatGroq'}), 500

if __name__ == '__main__':
    app.run(debug=True) # debug=True for automatic reloading
