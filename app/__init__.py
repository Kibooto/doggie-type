from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

import app.routes as routes

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__, static_url_path='/static')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
    app.secret_key = 'doggietroll' 
    login_manager.init_app(app)
   
    if not hasattr(app, 'db'):
        db.init_app(app)

    from app.models import User
    
    routes.configure_routes(app, db, login_manager)
    
    return app, db, login_manager, User