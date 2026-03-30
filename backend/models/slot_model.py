from extensions import db

class Slot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.String(50))
    end_time = db.Column(db.String(50))
    is_booked = db.Column(db.Boolean, default=False)