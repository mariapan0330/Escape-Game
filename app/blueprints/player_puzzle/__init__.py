from flask import Blueprint

player_puzzle = Blueprint('player_puzzle', __name__, url_prefix='/player_puzzle')

from . import routes