from . import puzzle

@puzzle.route('/')
def index():
    return "You've found the puzzle route!"