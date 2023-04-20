from flask import current_app as app, request, jsonify
from app.models import *

@app.route('/')
def index_page():
    print('Index Page')
    return jsonify({'msg':'Hello!'})

@app.route('/register/user',methods=['POST'])
def register_user():
    print('Register User')
    data = request.get_json()
    print(data)
    try:
        user = User(name=data['name'], age=data['age'])
        db.session.add(user)
        db.session.commit()
    except KeyError as e:
        print('keyerror, ', e)
    return jsonify('successful')

@app.route('/register/event',methods=['POST'])
def register_event():
    print("Register Event")
    data = request.get_json()
    print(data)
    try:
        event = Event(title=data['title'], location=data['location'])
        db.session.add(event)
        db.session.commit()
    except KeyError as e:
        print('keyerror, ', e)
    return jsonify('successful')

@app.route('/book', methods=['POST'])
def book_event():
    print('book event')
    data = request.get_json()
    print(data)
    try:
        booking = Booking(user_id=data['user_id'], event_id=data['event_id'])
        db.session.add(booking)
        db.session.commit()
    except KeyError as e:
        print('keyerror, ', e)
    return jsonify('successful')

@app.route('/list-events', methods=['GET'])
def get_event():
    print('list events')
    try:
        events = Event.query.all()
        return jsonify(Event.serialize_list(events))
    except Exception as e:
        print('error, ', e)
        return jsonify('failure')