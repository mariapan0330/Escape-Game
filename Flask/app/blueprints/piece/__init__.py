from flask import Blueprint

piece = Blueprint('piece', __name__, url_prefix='/piece')

from . import routes