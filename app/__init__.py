from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager

# create an instance of Flask for this app
app = Flask(__name__)

app.config.from_object(Config)

# create an instance of SQLAlchemy for this app
db = SQLAlchemy(app)

# pass app and db into migration engine
migrate = Migrate(app, db)

# create an instance of LoginManager for this app
login = LoginManager(app)
# TODO: the following might be unneccessary:
# login.login_view = 'login' # tells login manager endpoint to redirect to if user is not logged in
# login.login_message = 'You must be logged in to do that.'
# login.login_message_category = 'danger'

CORS(app)

from app.blueprints.api import api # tries to import api which imports the api and everything that it needs
app.register_blueprint(api) # adds the api to my main app

from . import routes, models # TODO: might not be necessary to import routes