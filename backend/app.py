from flask import Flask, request, jsonify
from langchain_model import generate_suggestion
import csv

app = Flask(__name__)

# Route to handle adding a patient
@app.route('/add-patient', methods=['POST'])
def add_patient():
    data = request.json
    name = data['name']
    symptoms = data['symptoms']
    problems = data['problems']
    
    # Save patient to CSV
    with open('data/sick.csv', 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([name, symptoms, problems])
    
    return jsonify({"message": "Patient added successfully"}), 200

# Route to fetch suggestions
@app.route('/get-suggestion', methods=['POST'])
def get_suggestion():
    data = request.json
    symptoms = data['symptoms']
    suggestion = generate_suggestion(symptoms)
    return jsonify({"suggestion": suggestion}), 200

if __name__ == '__main__':
    app.run(debug=True)
