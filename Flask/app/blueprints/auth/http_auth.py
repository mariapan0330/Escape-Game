# first, (kek_venv) >>> pip install flask-httpauth && pip freeze > requirements.txt
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from ...models import Player

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify(username, password):
    player = Player.query.filter_by(username=username).first()
    if player and player.check_password(password): # if the player is not None and the password is the one passed in, return player
        return player
    # if these fail it will return None by default

# now in blueprints > api > routes.py, i can set up the routes that use the verification


@token_auth.verify_token
def verify(token):
    player = Player.query.filter_by(token=token).first()
    if player: # if there is a player with the current token, you can return the player (otherwise, returns None)
        return player