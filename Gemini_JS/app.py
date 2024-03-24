from flask import Flask, render_template, request, jsonify
from google_generative_ai import GoogleGenerativeAI
import google.generativeai as genai

app = Flask(__name__)

# Initialize GoogleGenerativeAI with your API key
genAI = GoogleGenerativeAI("AIzaSyC_q1kel5pXMXbyZWzOtpMZPg8xEXp8fR8")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_content', methods=['POST'])
def generate_content():
    # Get the text input from the frontend
    text_input = request.form['text_input']

    # Generate content based on the input text
    model = genAI.get_generative_model(model="gemini-pro")
    prompt = f"Provide web citations on: {text_input}"
    result = model.generate_content(prompt)
    response = result.response
    generated_text = response.text

    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
