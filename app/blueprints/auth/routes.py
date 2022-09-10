from . import auth
from flask import jsonify, request
from ...models import User
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
    user = basic_auth.current_user()
    token = user.get_token()
    return jsonify({ "token": token })



# Create a user
@auth.route('/users', methods=["POST"])
# no auth required bc you need to make a user before you can create auth routes for them.
def create_user():
    data = request.json
    # validate the data
    for field in ['username', 'email', 'password']:
        if field not in data:
            return jsonify({ "error": f"You are missing the {field} field." }), 400
    # if it makes it through the for loop without errors:
    username = data['username']
    email = data['email']
    password = data['password']
    
    # if username or email already exists:
    user_exists = User.query.filter((User.username == username) | (User.email == email)).all()
    if user_exists:
        return jsonify({'error': f"User with username {username} or email {email} already exists."}), 400

    new_user = User(username=username, email=email, password=password)
    return jsonify(new_user.to_dict())


# Update a user by id
@auth.route('/users/<int:id>', methods=['PUT'])
@token_auth.login_required
def updated_user(id):
    current_user = token_auth.current_user()
    if current_user.id != id:
        return jsonify({ "error": "You do not have access to update this user" }), 403
    user = User.query.get_or_404(id)
    data = request.json
    user.update(data)
    return jsonify(user.to_dict())


# get user info from token
@auth.route('/current-user')
@token_auth.login_required
def current_user():
    return token_auth.current_user().to_dict()


# get all users
@auth.route('/users', methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


# delete user by id
@auth.route('/users/<int:id>', methods=["DELETE"])
@token_auth.login_required
def delete_user(id):
    current_user = token_auth.current_user()
    if current_user.id != id:
        return jsonify({"error": "You do not have permission to delete this user."}), 403
    user_to_delete = User.query.get_or_404(id)
    user_to_delete.delete()
    return jsonify({'success':f"{user_to_delete.username} has been deleted."})