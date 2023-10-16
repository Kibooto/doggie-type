from app import db
from flask_login import UserMixin
from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    level = db.Column(db.Integer, nullable=False, default=1)
    exp = db.Column(db.Integer, nullable=False, default=0)
    joined_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    bages = db.Column(db.String(128), nullable=False, default='[]')
    github = db.Column(db.String(128), nullable=False, default='')
    twitter = db.Column(db.String(128), nullable=False, default='')
    website = db.Column(db.String(128), nullable=False, default='')
    keyboard = db.Column(db.String(128), nullable=False, default='')
    bio = db.Column(db.String(128), nullable=False, default='')
    tests_started = db.Column(db.Integer, nullable=False, default=0)
    tests_completed = db.Column(db.Integer, nullable=False, default=0)
    time_of_typing = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<User {self.username}>'
    
    def is_active(self):
        return True
    
class Tests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    foreign_id = db.Column(db.Integer, nullable=False)
    test_name = db.Column(db.String(128), nullable=False)
    test_type = db.Column(db.String(128), nullable=False)
    test_language = db.Column(db.String(128), nullable=False)
    test_difficulty = db.Column(db.Integer, nullable=False)
    test_time = db.Column(db.Integer, nullable=False)
    test_wpm = db.Column(db.Integer, nullable=False)
    test_accuracy = db.Column(db.Integer, nullable=False)
    test_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    test_characters = db.Column(db.Integer, nullable=False)
    test_words = db.Column(db.Integer, nullable=False)
    test_correct_words = db.Column(db.Integer, nullable=False)
    test_incorrect_words = db.Column(db.Integer, nullable=False)
    test_correct_characters = db.Column(db.Integer, nullable=False)
    test_incorrect_characters = db.Column(db.Integer, nullable=False)
    test_consistency = db.Column(db.Integer, nullable=False)
    test_completed = db.Column(db.Boolean, nullable=False, default=False)