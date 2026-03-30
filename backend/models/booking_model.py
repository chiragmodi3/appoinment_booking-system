from extensions import db

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100))
    slot_id = db.Column(db.Integer, db.ForeignKey('slot.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))