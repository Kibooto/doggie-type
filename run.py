from app import create_app
from api.api_routes import api_bp

app = create_app()[0]

app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
