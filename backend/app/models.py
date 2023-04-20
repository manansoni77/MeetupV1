from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Serializer(object):

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=True)

class Event(db.Model, Serializer):
    __tablename__ = 'Event'
    event_id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    title = db.Column(db.String, nullable=False, unique=True)
    location = db.Column(db.String, nullable=False)

class Booking(db.Model):
    __tablename__ = 'Booking'
    booking_id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    event_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
