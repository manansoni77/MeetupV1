import os
from flask import Flask
from flask_cors import CORS
from app.models import db
from config import *

current_dir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret'
app.secret_key = app.config['SECRET_KEY']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.join(current_dir, DB_NAME)

db.init_app(app)

app.app_context().push()

if not os.path.exists(os.path.join(current_dir, DB_NAME)):
    print(db.create_all())

from app.routes import *

if __name__ == '__main__':
    app.run(debug=True, port=8080)