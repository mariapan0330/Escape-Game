from . import auth
from flask import jsonify, request
from ...models import Player
from .http_auth import basic_auth, token_auth

# Auth Routes homepage
@auth.route('/')
def index():
    return "You've found the AUTH route!"


# Login - Get token with username/pw
# ENDPOINT: http://127.0.0.1:5000/auth/token
@auth.route('/token', methods=["POST"])
@basic_auth.login_required
def get_token():
    player = basic_auth.current_user()
    token = player.get_token()
    return jsonify({ "token": token })

# Create a player
@auth.route('/players', methods=["POST"])
# no auth required bc you need to make a player before you can create auth routes for them.
def create_player():
    data = request.json
    # validate the data
    for field in ['username', 'email', 'password']:
        if field not in data:
            return jsonify({ "error": f"You are missing the {field} field." }), 400
    # if it makes it through the for loop without errors:
    username = data['username']
    email = data['email']
    
    # if username or email already exists:
    player_exists = Player.query.filter((Player.username == username) | (Player.email == email)).all()
    if player_exists:
        return jsonify({'error': f"Player with username {username} or email {email} already exists."}), 400

    new_player = Player(**data)
    return jsonify(new_player.to_dict())


# get all players
@auth.route('/players', methods=["GET"])
@token_auth.login_required
def get_players():
    current_player = token_auth.current_user()
    if current_player.is_admin:
        players = Player.query.all()
        return jsonify([u.to_dict() for u in players])
    else:
        return jsonify({ "error": "You do not have access to update this player" }), 403



# Update a player by id
@auth.route('/players/<int:id>', methods=['PUT'])
@token_auth.login_required
def updated_player(id):
    current_player = token_auth.current_user()
    if current_player.id != id:
        return jsonify({ "error": "You do not have access to update this player" }), 403
    player = Player.query.get_or_404(id)
    data = request.json
    player.update(data)
    return jsonify(player.to_dict())


# get player info from token
@auth.route('/current-player')
@token_auth.login_required
def current_player():
    return token_auth.current_user().to_dict()


# delete player by id
@auth.route('/players/<int:id>', methods=["DELETE"])
@token_auth.login_required
def delete_player(id):
    current_player = token_auth.current_user()
    if current_player.id != id:
        return jsonify({"error": "You do not have permission to delete this player."}), 403
    player_to_delete = Player.query.get_or_404(id)
    player_to_delete.delete()
    return jsonify({'success':f"{player_to_delete.username} has been deleted."})