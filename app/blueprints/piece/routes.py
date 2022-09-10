from . import piece
from flask import jsonify, request
from ...models import Player
from ..auth.http_auth import token_auth

@piece.route('/')
def index():
    return "You've found the piece route!"


# create a piece
@piece.route('/pieces', methods=["POST"])
def create_piece():
    pass

# view a piece by id
# view all pieces
# update a piece by id
# delete a piece by id