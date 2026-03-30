from models.booking_model import Booking
from models.slot_model import Slot
from extensions import db
from flask_jwt_extended import get_jwt_identity

def create_booking(slot_id):
    user_id = int(get_jwt_identity())  
    slot = Slot.query.get(slot_id)

    if not slot:
        return {"error": "Slot not found"}, 404

    if slot.is_booked:
        return {"error": "Slot already booked"}, 400

    booking = Booking(
        user_id=user_id,
        slot_id=slot_id
    )

    slot.is_booked = True

    db.session.add(booking)
    db.session.commit()

    return {"message": "Booking successful"}