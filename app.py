from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from langchain_community.llms import Ollama

app = Flask(__name__)
CORS(app)

fillin_json_path = os.path.join("fillups", "public", "fillinTheBlanks.json")
maths_json_path = os.path.join("maths", "public", "questions.json")
mcq_json_path = os.path.join("quiz", "public", "mcqData.json")
styling_json_path = os.path.join("quiz", "public", "styling.json")
styling_json_path1 = os.path.join("fillups", "public", "styling.json")
styling_json_path2 = os.path.join("flashcard", "public", "styling.json")
flashcard_json_path = os.path.join("flashcard", "public", "flashcards.json")

llm = Ollama(model="llama3.2")

#update the css
@app.route("/update-mcq-css", methods=["POST"])
def update_mcq():
    data=request.get_json()
    print(data)
    
    try:
        with open(styling_json_path, "w") as file:
            json.dump(data, file, indent=4)
        return {"message": "Styling updated successfully"}, 200
    except Exception as e:
        print(f"Error writing to styling.json: {e}")
        return {"message": "Error updating styling"}, 500
    
@app.route("/update-fill-css", methods=["POST"])
def update_fill():
    data=request.get_json()
    print(data)
    
    try:
        with open(styling_json_path1, "w") as file:
            json.dump(data, file, indent=4)
        return {"message": "Styling updated successfully"}, 200
    except Exception as e:
        print(f"Error writing to styling.json: {e}")
        return {"message": "Error updating styling"}, 500
    
@app.route("/update-flash-css", methods=["POST"])
def update_flash():
    data=request.get_json()
    print(data)
    
    try:
        with open(styling_json_path2, "w") as file:
            json.dump(data, file, indent=4)
        return {"message": "Styling updated successfully"}, 200
    except Exception as e:
        print(f"Error writing to styling.json: {e}")
        return {"message": "Error updating styling"}, 500
    
#mcq
def generate_mcqs_from_llm(prompt):
    try:
        response = llm.invoke(prompt)
        return response
    except Exception as e:
        print(f"Error generating questions: {e}")
        return None

@app.route("/generate-mcq", methods=["POST"])
def generate_mcq():
    data = request.get_json()
    print(data)

    topic = data.get('Topic:')
    level = data.get('Level:')
    num_questions = int(data.get('Number of Questions:'))
    num_options = int(data.get('Number of Options:'))

    prompt = (
        f"Generate {num_questions} multiple-choice questions about {topic} at a {level} level. "
        f"Each question must have {num_options} answer options, with one correct answer. "
        
        "Format the response as a JSON object like this: "
        
        "{\"questions\": [{\"question\": \"<question>\", \"options\": [\"<option1>\", \"<option2>\", \"<option3>\", \"<option4>\"], \"correct_answer\": \"<correct option>\"}, ...]}."
        
        "Make sure to clearly label each question, options, and answer."
        
        "Provide only the JSON part as the final response."
    )

    generated_output = generate_mcqs_from_llm(prompt)

    print("Raw output from the model:", generated_output)

    if generated_output is None:
        return jsonify({"error": "Failed to generate questions."}), 500

    try:
        questions = json.loads(generated_output)
    except json.JSONDecodeError as e:
        return jsonify({"error": f"Error parsing the response: {str(e)}"}), 500

    with open(mcq_json_path, "w") as json_file:
        json.dump({"questions": questions['questions']}, json_file, indent=4)

    return jsonify({"questions": questions['questions']})


#fill-ups

def generate_questions_from_llm(prompt):
    try:
        response = llm.invoke(prompt) 
        return response  
    except Exception as e:
        print(f"Error generating questions: {e}")
        return None

@app.route("/generate-fill", methods=["POST"])
def generate_fill():
    data = request.get_json()
    
    topic = data.get('Topic:')
    level = data.get('Level:')
    num_questions = int(data.get('Number of Questions:'))
    
    prompt = (
        f"Generate {num_questions} fill-in-the-blank questions about {topic} at a {level} level. "
        
        "Format the response as a JSON object like this: "
        "{\"questions\": [{\"question\": \"<question with blank>\", \"answer\": \"<correct answer>\"}, ...]}."
        "Only provide the JSON part in the final response."
    )
    
    generated_output = generate_questions_from_llm(prompt)
    
    print("Raw output from the model:", generated_output)
    
    if generated_output is None:
        return jsonify({"error": "Failed to generate questions."}), 500
    
    try:
        questions = json.loads(generated_output)
    except json.JSONDecodeError as e:
        return jsonify({"error": f"Error parsing the response: {str(e)}"}), 500

    # Save the generated questions to a JSON file
    output_data = {"questions": questions['questions']}
    with open(fillin_json_path, "w") as json_file:
        json.dump(output_data, json_file, indent=4)

    return jsonify({"questions": output_data['questions']})


#maths qu
def generate_questions_from_llm(prompt):
    try:
        response = llm.invoke(prompt) 
        return response 
    except Exception as e:
        print(f"Error generating questions: {e}")
        return None

def generate_math_questions_from_llm(prompt):
    try:
        response = llm.invoke(prompt)
        return response
    except Exception as e:
        print(f"Error generating questions: {e}")
        return None

@app.route("/generate-math", methods=["POST"])
def generate_math():
    data = request.get_json()
    print(data)

    num_questions = data.get('topic')  
    number_format = data.get('numberFormat')  
    operation_value = data.get('operation')  
    num_options = int(data.get('options'))  
    time_delay = data.get('timeDelay')  

    if operation_value == 'addition':
        operation = '+'  
    elif operation_value == 'subtraction':
        operation = '-'  
    elif operation_value == 'multiplication':
        operation = '*'  
    elif operation_value == 'combination':
        operation = random.choice(['+', '-', '*'])

    prompt = (
        f"Generate {num_questions} math questions on {operation_value} at an easy level. "
        f"Each number should have {number_format} digits (max two digits for 'two digits', max three digits for 'three digits'). "
        
        
        f"If the operation is addition, subtraction, or multiplication, the format of the question must be: '<number1> {operation} <number2>', e.g., '45 + 27' or '23 - 12'. "
        f"If the operation is 'combination', randomly select between addition, subtraction, and multiplication. "
        
        
        f"Each question should have {num_options} answer options, with one correct answer. "
        "Format the response as a JSON object like this: "
        "{\"questions\": [{\"question\": \"<number1> {operation} <number2>\", \"options\": [\"<option1>\", \"<option2>\", \"<option3>\", \"<option4>\"], \"answer\": \"<correct option>\"}, ...]}."
        "Make sure to clearly label each question, options, and answer."
        
        "Provide only the JSON part as the final response."
    )

    generated_output = generate_math_questions_from_llm(prompt)
    print(generated_output)

    if generated_output is None:
        return jsonify({"error": "Failed to generate questions."}), 500

    try:
        questions = json.loads(generated_output)
    except json.JSONDecodeError as e:
        return jsonify({"error": f"Error parsing the response: {str(e)}"}), 500

    with open(maths_json_path, "w") as json_file:
        json.dump({"questions": questions['questions']}, json_file, indent=4)

    return jsonify({"questions": questions['questions']})


def generate_flashcards_from_llm(prompt):
    try:
        response = llm.invoke(prompt)
        return response
    except Exception as e:
        print(f"Error generating flashcards: {e}")
        return None

# Function to save data to a JSON file
def save_to_file(path, data):
    try:
        with open(path, "w") as file:
            json.dump(data, file, indent=4)
    except Exception as e:
        print(f"Error writing to {path}: {e}")
        raise e

# Route to generate flashcards
@app.route("/generate-flashcards", methods=["POST"])
def generate_flashcards():
    data = request.get_json()

    # Extract parameters
    topic = data.get('Topic:')
    level = data.get('Level:')
    num_flashcards = int(data.get('Number of Questions:'))

    # LLM prompt for flashcards
    prompt = (
        f"Generate {num_flashcards} flashcards about {topic} at a {level} level. "
        "Each flashcard should be a JSON object with a 'question' and an 'answer'. "
        "Format the response as a JSON array like this: "
        "[{\"question\": \"What is 2 + 2?\", \"answer\": \"The answer is 4.\"}, "
        "{\"question\": \"What is the capital of France?\", \"answer\": \"The capital is Paris.\"}, ...]. "
        "Provide only the JSON array as the final output."
    )

    # Generate flashcards using the LLM
    generated_output = generate_flashcards_from_llm(prompt)

    print("Raw output from the model:", generated_output)

    # Handle errors or invalid output
    if generated_output is None:
        return jsonify({"error": "Failed to generate flashcards."}), 500

    try:
        flashcards = json.loads(generated_output)
    except json.JSONDecodeError as e:
        return jsonify({"error": f"Error parsing the response: {str(e)}"}), 500

    # Save the generated flashcards to a JSON file
    try:
        save_to_file(flashcard_json_path, flashcards)
    except Exception as e:
        return jsonify({"error": f"Error saving flashcards: {str(e)}"}), 500

    return jsonify({"flashcards": flashcards}), 200


if __name__ == "__main__":
    app.run(debug=True)
