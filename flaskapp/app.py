from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = []
courses = []
results = []

@app.route('/')
def home():
    return 'Welcome to Student Result Management System'

@app.route('/students', methods=['GET', 'POST'])
def student():
    if request.method == 'POST':
        data = request.get_json()
        if 'first_name' in data and 'last_name' in data and 'date_of_birth' in data:
            first_name = data['first_name']
            last_name = data['last_name']
            date_of_birth = data['date_of_birth']
            
            # Perform validation
            if first_name and last_name and date_of_birth and is_valid_date(date_of_birth) and is_older_than_ten(date_of_birth):
                student = {
                    'first_name': first_name,
                    'last_name': last_name,
                    'date_of_birth': date_of_birth
                }
                students.append(student)
                return jsonify({'message': 'Student added successfully'})
            else:
                return jsonify({'error': 'Invalid student data'})
        else:
            return jsonify({'error': 'Missing student data'})
    elif request.method == 'GET':
        return jsonify(students)

@app.route('/courses', methods=['GET', 'POST'])
def course():
    if request.method == 'POST':
        data = request.get_json()
        if 'course_name' in data:
            course_name = data['course_name']
            
            # Perform validation
            if course_name:
                course = {
                    'course_name': course_name
                }
                courses.append(course)
                return jsonify({'message': 'Course added successfully'})
            else:
                return jsonify({'error': 'Invalid course data'})
        else:
            return jsonify({'error': 'Missing course data'})
    elif request.method == 'GET':
        return jsonify(courses)

@app.route('/results', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        data = request.get_json()
        if 'course_name' in data and 'student_name' in data and 'score' in data:
            course_name = data['course_name']
            student_name = data['student_name']
            score = data['score']
            
            # Perform validation
            if course_name and student_name and score:
                result = {
                    'course_name': course_name,
                    'student_name': student_name,
                    'score': score
                }
                results.append(result)
                return jsonify({'message': 'Result added successfully'})
            else:
                return jsonify({'error': 'Invalid result data'})
        else:
            return jsonify({'error': 'Missing result data'})
    elif request.method == 'GET':
        return jsonify(results)

def is_valid_date(date):
    # Check if date is valid
    # You can implement your own validation logic here
    return True

def is_older_than_ten(date_of_birth):
    # Check if student is older than ten years
    # You can implement your own validation logic here
    return True

if __name__ == '__main__':
    app.run(debug=True)
