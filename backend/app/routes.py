from datetime import datetime, timedelta
from flask import current_app as app, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from app.models import *

def devres(result):
    print(result)
    return jsonify(result)

@app.route('/')
def index_page():
    print('Index Page')
    return devres({'msg':'Hello!'})

@app.route('/signup', methods=['POST'])
def signup():
    print('Signup')
    data = request.get_json()
    print(data)
    try:
        user = User(name=data['name'], age=data['age'], username=data['username'], password=generate_password_hash(data['password']))
        db.session.add(user)
        db.session.commit()
        token = jwt.encode({'user_id': user.user_id, 'exp': datetime.utcnow()+timedelta(hours=1)},
                           app.config['SECRET_KEY'], 'HS256')
        return make_response(devres({'token': token}), 200)
    except KeyError as e:
        print('Key Error, ', e)
        return 'Key Error', 500
    except IntegrityError as e:
        db.session.rollback()
        print('Integrity Error, ', e)
        return 'Integrity Error', 500
    except Exception as e:
        print('Error, ', e)
        return 'Error', 500

@app.route('/signin', methods=['POST'])
def signin():
    print('Signin')
    data = request.get_json()
    print(data)
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if user:
        print(user.password, password)
        if check_password_hash(user.password, password):
            token = jwt.encode({'user_id': user.user_id, 'exp': datetime.utcnow()+timedelta(hours=1)},
                               app.config['SECRET_KEY'], 'HS256')
            return make_response(devres({"message": 'Logged In!', "token": token}), 201)
        else:
            return make_response(devres({"message": 'Wrong Password!'}), 202)
    else:
        return make_response(devres({"message": 'User Does Not Exist!'}), 203)

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
    return devres('successful')

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
    return devres('successful')

@app.route('/list-events', methods=['GET'])
@token_required
def get_event(user_id):
    print('list events')
    try:
        events = Event.query.all()
        return devres(Event.serialize_list(events))
    except Exception as e:
        print('error, ', e)
        return devres('failure')