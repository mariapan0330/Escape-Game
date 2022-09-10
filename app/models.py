import os
import base64
from datetime import datetime, timedelta
from app import db
from werkzeug.security import generate_password_hash as gen_pw_hash, check_password_hash as check_pw_hash

        ############
        #          #
        #   USER   #
        #          #
        ############

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    current_location = db.Column(db.String(100), default='gate')

    token = db.Column(db.String(32), unique=True, index=True)
    # token_expiration = db.Column(db.DateTime)

    # items = db.relationship('Item', backref='player', lazy=True)
    # puzzles = db.relationship("Puzzle", backref='player', lazy=True)
    

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.password = gen_pw_hash(kwargs['password'])
        db.session.add(self)
        db.session.commit()

    
    def __repr__(self):
        return f"<User|{self.username}>"

    def check_password(self, password):
        return check_pw_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'date_created': self.date_created,
        }

    
    def get_token(self):
        if self.token:
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        db.session.commit()
        return self.token
    

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field not in {'username', 'email', 'password', 'first_name'}:
                continue
            if field == 'password':
                setattr(self, field, gen_pw_hash(data[field]))
            else:
                setattr(self, field, data[field])
        db.session.commit()



        #############
        #           #
        #   PIECE   #
        #           #
        #############

class Piece(db.Model):
    piece_id = db.Column(db.Integer, primary_key=True)
    piece_name = db.Column(db.String(50), nullable=False, unique=True)
    piece_description = db.Column(db.String(200), nullable=False)
    piece_image = db.Column(db.String(400), nullable=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Piece|{self.piece_name}>"
    
    def to_dict(self):
        return {
            'piece_id': self.piece_id,
            'piece_name': self.piece_name,
            'piece_description': self.piece_description,
            'piece_image': self.piece_image
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, data):
        for field in data:
            if field not in {'piece_name', 'piece_description', 'piece_image'}:
                continue
            setattr(self, field, data[field])
        db.session.commit()




        ##############
        #            #
        #   PUZZLE   #
        #            #
        ##############




        #####################
        #                   #
        #   PLAYER-PUZZLE   #
        #                   #
        #####################




        ###########################
        #                         #
        #   PLAYER-PUZZLE-PIECE   #
        #                         #
        ###########################