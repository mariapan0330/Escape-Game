from flask import Blueprint

player_puzzle_piece = Blueprint('player_puzzle_piece', __name__, url_prefix='/player_puzzle_piece')

from . import routes