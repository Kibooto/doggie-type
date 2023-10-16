from app import create_app

app = create_app()[0]
db = create_app()[1]

with app.app_context():
    db.create_all()

