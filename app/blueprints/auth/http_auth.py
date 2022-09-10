# first, (kek_venv) >>> pip install flask-httpauth && pip freeze > requirements.txt
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from ...models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password): # if the user is not None and the password is the one passed in, return user
        return user
    # if these fail it will return None by default

# now in blueprints > api > routes.py, i can set up the routes that use the verification


@token_auth.verify_token
def verify(token):
    user = User.query.filter_by(token=token).first()
    if user: # if there is a user with the current token, you can return the user (otherwise, returns None)
        return user