from flask import Flask
from flask_cors import CORS
from extensions import db
from flask_jwt_extended import JWTManager
from routes.booking_routes import booking_bp
from routes.slot_routes import slot_bp
from routes.auth_routes import auth_bp
from dotenv import load_dotenv
import os
from models.user_model import User

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret-key")

jwt = JWTManager(app)
db.init_app(app)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(booking_bp, url_prefix="/booking")
app.register_blueprint(slot_bp, url_prefix="/slots")

def create_default_admin():
    username = os.getenv("ADMIN_USERNAME", "admin")
    password = os.getenv("ADMIN_PASSWORD", "admin123")

    if not username or not password:
        print("❌ Admin credentials missing in .env")
        return

    admin = User.query.filter_by(username=username).first()

    if not admin:
        new_admin = User(
            username=username,
            password=password,
            role="admin"
        )
        db.session.add(new_admin)
        db.session.commit()
        print("✅ Default admin created")
    else:
        print("ℹ️ Admin already exists")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        create_default_admin()

    app.run(debug=True)