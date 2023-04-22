from flask_sqlalchemy import SQLAlchemy
from flask import request, current_app as app, make_response, jsonify
from functools import wraps
import jwt

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
    user_name = db.Column(db.String, primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

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

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return make_response(jsonify({"message": "A valid token is missing!"}), 401)
        try:
            data = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except Exception:
            return make_response(jsonify({"message": "Invalid token!"}), 401)
        return f(data['user_id'], *args, **kwargs)
    return decorator