from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
# from flask_login import LoginManager

# create an instance of Flask for this app
app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

# create an instance of SQLAlchemy for this app
db = SQLAlchemy(app)

# pass app and db into migration engine
migrate = Migrate(app, db)

# create an instance of LoginManager for this app
# login = LoginManager(app)


from app.blueprints.auth import auth # imports auth
app.register_blueprint(auth) # adds the auth to my main app

from app.blueprints.piece import piece # imports piece
app.register_blueprint(piece) # adds the piece to my main app
