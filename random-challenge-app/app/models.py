# Placeholder for Python file
from . import db

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    task = db.Column(db.String(200), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)

class UserHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(255), nullable=False)
    date_completed = db.Column(db.DateTime, nullable=False)