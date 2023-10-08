from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user, logout_user, login_user
from app import db, login_manager
from app.models import User
from werkzeug.security import generate_password_hash, check_password_hash

api_bp = Blueprint('api', __name__)

@api_bp.route('/auth/check_username', methods=['GET', 'POST'])
def check_username():
    name = request.form.get('username')
    
    if User.query.filter_by(username=name).first():
        return jsonify({'message': 'Username already exists.'}), 400 

    return jsonify({'message': 'Username is available.'}), 200

@api_bp.route('/auth/check_email', methods=['GET', 'POST'])
def check_email():
    email = request.form.get('email')
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists.'}), 400 

    return jsonify({'message': 'Email is available.'}), 200

@api_bp.route('/register', methods=['GET', 'POST'])
def reg_user():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    print(username, email, password)

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists.'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists.'}), 400
    
    user = User(username=username, email=email, password_hash=generate_password_hash(password, method='scrypt'))
    db.session.add(user)
    db.session.commit()

    existing_user = User.query.filter_by(username=username).first()
    login_user(existing_user)
    print("User logged in successfully.")

    return jsonify({'message': 'User created successfully.'}), 200

@api_bp.route('/login', methods=['GET', 'POST'])
def log_user():
    username = request.form.get("username")
    password = request.form.get("password")

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        print("User logged in successfully.")
        return jsonify({'message': 'User logged in successfully.'}), 200
    else:
        return jsonify({'message': 'Invalid username or password.'}), 400