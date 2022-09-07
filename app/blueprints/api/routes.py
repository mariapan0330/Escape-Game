from . import api

@api.route('/')
def index():
    return "You've found the API route!"