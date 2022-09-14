from . import player_puzzle
from flask import jsonify, request
from ...models import PlayerPuzzle
from ..auth.http_auth import token_auth

##### MUST BE LOGGED IN AND MARKED AS ADMIN TO CREATE, RETRIEVE, UPDATE, AND DEL PUZZLES #####


# @player_puzzle.route('/')
# def index():
#     return "You've found the player puzzle route!"


# Link Player-Puzzle
@player_puzzle.route('/', methods=["POST"])
# @token_auth.login_required
def create_player_puzzle():
    # if token_auth.current_user().is_admin:
    data = request.json
    for field in [
        'player_id', 
        'puzzle_id',
        'player_saw_puzzle',
        'player_completed_puzzle',
        'correct_combination']:
        if field not in data:
            return jsonify({ "error": f"You are missing the {field} field." }), 400
    player_id = data['player_id']
    puzzle_id = data['puzzle_id']
    player_puzzle_exists = PlayerPuzzle.query.filter((PlayerPuzzle.player_id == player_id) & (PlayerPuzzle.puzzle_id == puzzle_id)).all()
    if player_puzzle_exists:
        return jsonify({'error': f"Player-Puzzle combo of {player_id}, {puzzle_id} already exists."}), 400

    new_player_puzzle = PlayerPuzzle(**data)
    return jsonify(new_player_puzzle.to_dict())


# View all player-puzzles
@player_puzzle.route('/', methods=["GET"])
@token_auth.login_required
def view_all_player_puzzles():
    if token_auth.current_user().is_admin == False:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzles = PlayerPuzzle.query.all()
    return jsonify([p.to_dict() for p in player_puzzles])
   

# View a player-puzzle by id
@player_puzzle.route('/<int:id>', methods=["GET"])
@token_auth.login_required
def view_player_puzzle(id):
    if token_auth.current_user().is_admin == False:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle = PlayerPuzzle.query.get_or_404(id)
    return jsonify(player_puzzle.to_dict())


# View current player's player-puzzles
@player_puzzle.route('/current-player', methods=["GET"])
@token_auth.login_required
def view_current_player_puzzles():
    current_player = token_auth.current_user()
    player_puzzles = PlayerPuzzle.query.filter(PlayerPuzzle.player_id == current_player.id).all()
    # player_puzzle_ids = [p.player_puzzle_id for p in player_puzzles]
    return jsonify([p.to_dict() for p in player_puzzles])


# update a player-puzzle by id
@player_puzzle.route('/<int:id>', methods=["PUT"])
# @token_auth.login_required
def update_player_puzzle(id):
    # if token_auth.current_user().is_admin == False:
    #     return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle = PlayerPuzzle.query.get_or_404(id)
    data = request.json
    player_puzzle.update(data)
    return jsonify(player_puzzle.to_dict())
    

# delete a player-puzzle by id
@player_puzzle.route('/<int:id>', methods=["DELETE"])
@token_auth.login_required
def delete_player_puzzle(id):
    if token_auth.current_user().is_admin == False:
        return jsonify({ "error": f"You are not authorized to do that" }), 403
    player_puzzle = PlayerPuzzle.query.get_or_404(id)
    player_puzzle.delete()
    return jsonify({'success':f"{player_puzzle.player_puzzle_id} has been deleted."})