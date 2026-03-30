from flask import Blueprint, request, jsonify
from services.booking_service import create_booking
from utils.decorators import admin_required
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.booking_model import Booking
from models.slot_model import Slot
from models.user_model import User
from extensions import db

booking_bp = Blueprint('booking', __name__)

@booking_bp.route("/", methods=["POST"])
@jwt_required()
def book():
    data = request.json
    result = create_booking(data['slot_id'])
    return jsonify(result)

@booking_bp.route("/cancel/<int:slot_id>", methods=["DELETE"])
def cancel_booking(slot_id):
    booking = Booking.query.filter_by(slot_id=slot_id).first()

    if not booking:
        return jsonify({"error": "No booking found"}), 404

    slot = Slot.query.get(slot_id)
    slot.is_booked = False

    db.session.delete(booking)
    db.session.commit()

    return jsonify({"message": "Booking cancelled"})

@booking_bp.route("/my", methods=["GET"])
@jwt_required()
def my_bookings():
    user_id = int(get_jwt_identity())
    bookings = Booking.query.filter_by(user_id=user_id).all()

    result = []

    for b in bookings:
        slot = Slot.query.get(b.slot_id)

        if not slot:
            continue

        result.append({
            "slot_id": b.slot_id,
            "start_time": slot.start_time,
            "end_time": slot.end_time
        })

    return jsonify(result)

@booking_bp.route("/all", methods=["GET"])
@jwt_required()
@admin_required
def all_bookings():
    bookings = Booking.query.all()

    result = []

    for b in bookings:
        user = User.query.get(b.user_id)
        slot = Slot.query.get(b.slot_id)

        if not user or not slot:
            continue

        result.append({
            "username": user.username,
            "start_time": slot.start_time,
            "end_time": slot.end_time
        })

    return jsonify(result)