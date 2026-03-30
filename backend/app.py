from flask import Flask
from flask_cors import CORS
from extensions import db   
from flask_jwt_extended import JWTManager
from routes.booking_routes import booking_bp
from routes.slot_routes import slot_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)

db.init_app(app)   

CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(booking_bp, url_prefix="/booking")
app.register_blueprint(slot_bp, url_prefix="/slots")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()   
    app.run(debug=True)