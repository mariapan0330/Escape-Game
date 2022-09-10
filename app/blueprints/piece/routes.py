from . import piece
from flask import jsonify, request
from ...models import User

@piece.route('/')
def index():
    return "You've found the piece route!"