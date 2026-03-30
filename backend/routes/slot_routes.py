from flask import Blueprint, request, jsonify
from extensions import db
from models.slot_model import Slot
from utils.decorators import admin_required
from flask_jwt_extended import jwt_required

slot_bp = Blueprint('slot', __name__)

@slot_bp.route("/", methods=["POST"])
@jwt_required()
@admin_required
def create_slot():
    data = request.json

    start_time = data.get("start_time")
    end_time = data.get("end_time")

    if not start_time or not end_time:
        return jsonify({"error": "Start time and end time required"}), 400

    existing = Slot.query.filter_by(start_time=start_time, end_time=end_time).first()
    if existing:
        return jsonify({"error": "Slot already exists"}), 400

    new_slot = Slot(
        start_time=start_time,
        end_time=end_time,
        is_booked=False
    )

    db.session.add(new_slot)
    db.session.commit()

    return jsonify({
        "message": "Slot created successfully",
        "slot_id": new_slot.id
    }), 201

@slot_bp.route("/", methods=["GET"])
def get_all_slots():
    slots = Slot.query.all()

    result = []
    for slot in slots:
        result.append({
            "id": slot.id,
            "start_time": slot.start_time,
            "end_time": slot.end_time,
            "is_booked": slot.is_booked
        })

    return jsonify(result), 200

@slot_bp.route("/available", methods=["GET"])
def get_available_slots():
    slots = Slot.query.filter_by(is_booked=False).all()

    result = []
    for slot in slots:
        result.append({
            "id": slot.id,
            "start_time": slot.start_time,
            "end_time": slot.end_time
        })

    return jsonify(result), 200

@slot_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
@admin_required
def update_slot(id):
    slot = Slot.query.get(id)

    if not slot:
        return {"error": "Slot not found"}, 404

    data = request.json

    slot.start_time = data.get("start_time", slot.start_time)
    slot.end_time = data.get("end_time", slot.end_time)

    db.session.commit()

    return {"message": "Slot updated successfully"}

@slot_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()     
@admin_required
def delete_slot(id):
    slot = Slot.query.get(id)

    if not slot:
        return {"error": "Slot not found"}, 404

    db.session.delete(slot)
    db.session.commit()

    return {"message": "Slot deleted"}