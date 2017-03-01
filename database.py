from flask import flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config.from_pyfile('app.cfg')
db = SQLAlchemy(app)

class User(db.Model):
	__tablename__ = 'users'
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), nullable=False)
	password = db.Column(db.String(255), nullable=False)
	email = db.Column(db.String(255), unique=True, nullable=False)
	active = db.Column(db.Boolean(), nullable=False)

	def __init__(self, username, password, email):
		self.username = username
		self.password = password
		self.email = email

class VerifyKeys(db.Model):
	__tablename__ = 'verifykeys'
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
	emailed_key = db.Column(db.String(100))

	user = db.relationship('User', backref='verifykey')

	def __init__(self, user_id, emailed_key):
		self.user_id = user_id
		self.emailed_key = emailed_key

class Conversations(db.Model):
	__tablename__ = 'conversations'
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	user = db.relationship('User', backref='conversation')

	def __init__(self, user_id):
		self.user_id = user_id

class Messages(db.Model):
	__tablename__ = 'messages'
	id = db.Column(db.Integer, primary_key=True)
	conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'))
	text = db.Column(db.String, nullable=False)
	date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

	conversation = db.relationship('Conversations', backref='message')

	def __init__(self, conversation_id, text):
		this.conversation_id = conversation_id
		this.text = text

@app.route('/')
def hello_world():
    return 'Hello, World!'