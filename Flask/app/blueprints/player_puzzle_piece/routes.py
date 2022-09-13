from . import player_puzzle_piece
from flask import jsonify, request
from ...models import PlayerPuzzlePiece
from ..auth.http_auth import token_auth

##### MUST BE LOGGED IN AND MARKED AS ADMIN TO CREATE, RETRIEVE, UPDATE, AND DEL PUZZLES #####


# @player_puzzle_piece.route('/')
# def index():
#     return "You've found the player puzzle route!"


# Link Player-Puzzle
@player_puzzle_piece.route('/', methods=["POST"])
# @token_auth.login_required
def create_player_puzzle_piece():
    # if token_auth.current_user().is_admin:
    data = request.json
    for field in [
        'player_puzzle_id',
        'piece_id',
        'player_saw_piece',
        'player_has_piece'
        ]:
        if field not in data:
            return jsonify({ "error": f"You are missing the {field} field." }), 400
    player_puzzle_id = data['player_puzzle_id']
    piece_id = data['piece_id']
    player_puzzle_exists = PlayerPuzzlePiece.query.filter((PlayerPuzzlePiece.player_puzzle_id == player_puzzle_id) & (PlayerPuzzlePiece.piece_id == piece_id)).all()
    if player_puzzle_exists:
        return jsonify({'error': f"Player-Puzzle-Piece combo of {player_puzzle_id}, {piece_id} already exists."}), 400

    new_player_puzzle_piece = PlayerPuzzlePiece(**data)
    return jsonify(new_player_puzzle_piece.to_dict())


# View all player-puzzles
@player_puzzle_piece.route('/', methods=["GET"])
@token_auth.login_required
def view_all_player_puzzle_pieces():
    if token_auth.current_user().is_admin == False:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle_pieces = PlayerPuzzlePiece.query.all()
    return jsonify([p.to_dict() for p in player_puzzle_pieces])
   

# View a player-puzzle by id
@player_puzzle_piece.route('/<int:id>', methods=["GET"])
@token_auth.login_required
def view_player_puzzle_piece(id):
    if token_auth.current_user().is_admin == False:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle_piece = PlayerPuzzlePiece.query.get_or_404(id)
    return jsonify(player_puzzle_piece.to_dict())


# update a player-puzzle by id
@player_puzzle_piece.route('/<int:id>', methods=["PUT"])
# @token_auth.login_required
def update_player_puzzle_piece(id):
    # if token_auth.current_user().is_admin == False:
    #     return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle_piece = PlayerPuzzlePiece.query.get_or_404(id)
    data = request.json
    player_puzzle_piece.update(data)
    return jsonify(player_puzzle_piece.to_dict())
    

# delete a puzzle by id
@player_puzzle_piece.route('/<int:id>', methods=["DELETE"])
@token_auth.login_required
def delete_player_puzzle(id):
    if token_auth.current_user().is_admin == False:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle_piece = PlayerPuzzlePiece.query.get_or_404(id)
    player_puzzle_piece.delete()
    return jsonify({'success':f"{player_puzzle_piece.player_puzzle_id} has been deleted."})