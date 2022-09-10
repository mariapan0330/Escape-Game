from . import puzzle
from flask import jsonify, request
from ...models import Puzzle
from ..auth.http_auth import token_auth

##### MUST BE LOGGED IN AND MARKED AS ADMIN TO CREATE, RETRIEVE, UPDATE, AND DEL PUZZLES #####


# @puzzle.route('/')
# def index():
#     return "You've found the puzzle route!"


# Create a puzzle
@puzzle.route('/', methods=["POST"])
@token_auth.login_required
def create_puzzle():
    if token_auth.current_user().is_admin:
        data = request.json
        for field in ['puzzle_name', 'puzzle_description',
        'puzzle_image']:
            if field not in data:
                return jsonify({ "error": f"You are missing the {field} field." }), 400
        puzzle_name = data['puzzle_name']
        puzzle_exists = Puzzle.query.filter((Puzzle.puzzle_name == puzzle_name)).all()
        if puzzle_exists:
            return jsonify({'error': f"Puzzle called '{puzzle_name}' already exists."}), 400

    new_puzzle = Puzzle(**data)
    return jsonify(new_puzzle.to_dict())


# View all puzzles
@puzzle.route('/', methods=["GET"])
@token_auth.login_required
def view_all_puzzles():
    if token_auth.current_user().is_admin:
        puzzles = Puzzle.query.all()
        return jsonify([p.to_dict() for p in puzzles])
    else:
        return jsonify({ "error": f"You are not authorized to do that bro" }), 403
   

# View a puzzle by id
@puzzle.route('/<int:id>', methods=["GET"])
@token_auth.login_required
def view_puzzle(id):
    if token_auth.current_user().is_admin:
        puzzle = Puzzle.query.get_or_404(id)
        return jsonify(puzzle.to_dict())
    else:
        return jsonify({ "error": f"You are not authorized to do that bro" }), 403


# update a puzzle by id
@puzzle.route('/<int:id>', methods=["PUT"])
@token_auth.login_required
def update_puzzle(id):
    if token_auth.current_user().is_admin:
        puzzle = Puzzle.query.get_or_404(id)
        data = request.json
        puzzle.update(data)
        return jsonify(puzzle.to_dict())
    else:
        return jsonify({ "error": f"You are not authorized to do that bro" }), 403


# delete a puzzle by id
@puzzle.route('/<int:id>', methods=["DELETE"])
@token_auth.login_required
def delete_puzzle(id):
    if token_auth.current_user().is_admin:
        puzzle = Puzzle.query.get_or_404(id)
        puzzle.delete()
        return jsonify({'success':f"{puzzle.puzzle_name} has been deleted."})
    else:
        return jsonify({ "error": f"You are not authorized to do that bro" }), 403