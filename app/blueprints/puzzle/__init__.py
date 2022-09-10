from flask import Blueprint

puzzle = Blueprint('puzzle', __name__, url_prefix='/puzzle')

from . import routes