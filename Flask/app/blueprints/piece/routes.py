from . import piece
from flask import jsonify, request
from ...models import Piece
from ..auth.http_auth import token_auth

# @piece.route('/')
# def index():
#     return "You've found the piece route!"


# create a piece
@piece.route('/', methods=["POST"])
# @token_auth.login_required
def create_piece():
    # if token_auth.current_user().is_admin:
    data = request.json
    for field in ['piece_name', 'piece_description',
    'piece_image']:
        if field not in data:
            return jsonify({ "error": f"You are missing the {field} field." }), 400
    piece_name = data['piece_name']
    piece_exists = Piece.query.filter((Piece.piece_name == piece_name)).all()
    if piece_exists:
        return jsonify({'error': f"Piece called '{piece_name}' already exists."}), 400

    new_piece = Piece(**data)
    return jsonify(new_piece.to_dict())




# view all pieces
@piece.route('/', methods=["GET"])
@token_auth.login_required
def view_all_pieces():
    if token_auth.current_user().is_admin:
        pieces = Piece.query.all()
        return jsonify([p.to_dict() for p in pieces])
    else:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    

# view a piece by id
@piece.route('/<int:id>', methods=["GET"])
@token_auth.login_required
def view_piece(id):
    if token_auth.current_user().is_admin:
        piece = Piece.query.get_or_404(id)
        return jsonify(piece.to_dict())
    else:
        return jsonify({ "error": f"You are not authorized to do that" }), 403


# update a piece by id
@piece.route('/<int:id>', methods=["PUT"])
@token_auth.login_required
def update_piece(id):
    if token_auth.current_user().is_admin:
        piece = Piece.query.get_or_404(id)
        data = request.json
        piece.update(data)
        return jsonify(piece.to_dict())
    else:
        return jsonify({ "error": f"You are not authorized to do that" }), 403


# delete a piece by id
@piece.route('/<int:id>', methods=["DELETE"])
@token_auth.login_required
def delete_piece(id):
    if token_auth.current_user().is_admin:
        piece = Piece.query.get_or_404(id)
        piece.delete()
        return jsonify({'success':f"{piece.piece_name} has been deleted."})
    else:
        return jsonify({ "error": f"You are not authorized to do that" }), 403