from flask import Blueprint, request, jsonify
from models.user_model import User
from extensions import db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json

    user = User(
        username=data["username"],
        password=data["password"],
        role=data.get("role", "user")  # admin or user
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"})


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(username=data["username"]).first()

    if not user or user.password != data["password"]:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id), additional_claims={
    "role": user.role
    })

    return jsonify({
        "token": token,
        "role": user.role
    })