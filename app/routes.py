from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user, logout_user, login_user
from werkzeug.security import check_password_hash

def configure_routes(app, db, login_manager):
    @login_manager.user_loader
    def load_user(user_id):
        from app.models import User
        return User.query.get(int(user_id))

    @app.route('/', methods=['GET', 'POST'])
    def index():
        return render_template('index.html', current_user=current_user)
    
    @app.route('/about', methods=['GET', 'POST'])
    def about():
        return render_template('about.html', current_user=current_user)
    
    @app.route('/settings', methods=['GET', 'POST'])
    def settings():
        return render_template('settings.html', current_user=current_user)

    @app.route('/auth', methods=['GET', 'POST'])
    def auth():
        if current_user.is_authenticated:
            return redirect(url_for('index'))
        
        return render_template('auth.html', current_user=current_user)
    
    @app.route('/profile', methods=['GET', 'POST'])
    @login_required
    def profile():
        from app.models import User
        user_data = db.session.query(User).filter_by(username=current_user.username).first()

        from app.models import Tests

        tests = db.session.query(Tests).filter_by(foreign_id=current_user.id).all()

        return render_template('profile.html', user = user_data, current_user=current_user, user_tests=tests)
    
    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('auth'))