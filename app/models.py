from app import db, login # these are the instances of SQLAlchemy and LoginManager we made in app/__init__.py
from datetime import datetime
# import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    # columns in database:
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    username = db.Column(db.Sring(25), nullable=False)
    password = db.Column(db.String(256), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)
    # when changing the database, do:
    # >>> flask db migrate -m "message"
    # >>> flask db upgrade

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.set_password(kwargs['password'])
        # db.session.add(self)
        # db.session.commit()
    
    def __repr__(self):
        return f"<User {self.user_id} | {self.username}>"

    
    def set_password(self, pw):
        self.password = generate_password_hash(pw)
    
    def check_password(self, pw):
        return check_password_hash(self.password, pw)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'date_created': self.date_created
        }
    
    def get_token(self):
        # TODO: token expiration unnecessary?
        pass

