import os
import base64
from datetime import datetime, timedelta
from app import db
from werkzeug.security import generate_password_hash as gen_pw_hash, check_password_hash as check_pw_hash

        ############
        #          #
        #   USER   #
        #          #
        ############

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    current_location = db.Column(db.String(100), default='prologue')
    is_admin = db.Column(db.Boolean, default=False)
    new_game = db.Column(db.Boolean, default=True)
    hotbar_slot_1 = db.Column(db.Integer, default=1)
    hotbar_slot_2 = db.Column(db.Integer, default=1)
    hotbar_slot_3 = db.Column(db.Integer, default=1)
    hotbar_slot_4 = db.Column(db.Integer, default=1)
    hotbar_slot_5 = db.Column(db.Integer, default=1)
    hotbar_slot_6 = db.Column(db.Integer, default=1)
    hotbar_slot_7 = db.Column(db.Integer, default=1)

    # the following makes it work for demonstration purposes, but it is truly awful and would probably be better to have multiple tables:
    # Create pieces for items
    # mark whether or not we have/saw them here.
    # (they are grouped by puzzle, except the house door which has no solution yet.)
    # --- Uppercase are places. ---

    # --- GATE ---
    # gate door
    has_key_a = db.Column(db.Boolean, default=False)
    selected_key_a = db.Column(db.Boolean, default=False)
    solved_gate_keyhole = db.Column(db.Boolean, default=False)

    # address sign has screws
    has_coin = db.Column(db.Boolean, default=False)
    selected_coin = db.Column(db.Boolean, default=False)
    solved_address_screws = db.Column(db.Boolean, default=False)

    # box in mailbox
    saw_address = db.Column(db.Boolean, default=False)
    saw_address_hidden_symbols = db.Column(db.Boolean, default=False)
    mailbox_box_correct_combination = db.Column(db.String(10), default="8237")
    mailbox_box_combination_entered = db.Column(db.String(10), default='0000')
    solved_mailbox_box = db.Column(db.Boolean, default=False) # (red gem inside)

    # --- PLAZA ---
    # wall fountains
    has_red_gem = db.Column(db.Boolean, default=False)
    has_blue_gem = db.Column(db.Boolean, default=False)
    has_green_gem = db.Column(db.Boolean, default=False)
    has_yellow_gem = db.Column(db.Boolean, default=False)
    selected_red_gem = db.Column(db.Boolean, default=False)
    selected_blue_gem = db.Column(db.Boolean, default=False)
    selected_green_gem = db.Column(db.Boolean, default=False)
    selected_yellow_gem = db.Column(db.Boolean, default=False)
    saw_fountain_bench_animals = db.Column(db.Boolean, default=False)
    wall_fountains_correct_combination = db.Column(db.String(10), default="RYGB")
    wall_fountains_combination_entered = db.Column(db.String(10), default="NNNN")
    solved_wall_fountains = db.Column(db.Boolean, default=False)
    
    # --- GAZEBO ---
    # telescope
    has_telescope_lens = db.Column(db.Boolean, default=False)
    selected_telescope_lens = db.Column(db.Boolean, default=False)
    solved_carved_trees_no_order = db.Column(db.Boolean, default=False)

    #  --- PORCH ---
    # house door
    solved_house_door_key = db.Column(db.Boolean, default=False) # (currently no solution)

    # toolbox
    saw_toolbox_note = db.Column(db.Boolean, default=False)
    has_magnet = db.Column(db.Boolean, default=False)
    selected_magnet = db.Column(db.Boolean, default=False)
    has_key_b = db.Column(db.Boolean, default=False)
    selected_key_b = db.Column(db.Boolean, default=False)
    solved_toolbox = db.Column(db.Boolean, default=False)

    # FOUNTAIN
    # fountain door
    has_key_c = db.Column(db.Boolean, default=False)
    selected_key_c = db.Column(db.Boolean, default=False)
    solved_fountain_door = db.Column(db.Boolean, default=False) #(blue gem)
    
    # fountain bench pillow
    has_knife = db.Column(db.Boolean, default=False)
    selected_knife = db.Column(db.Boolean, default=False)
    solved_fountain_bench_pillow = db.Column(db.Boolean, default=False)

    # --- FLOWER TUNNEL --- 
    # flower tunnel
    saw_carved_trees = db.Column(db.Boolean, default=False)
    saw_compass_mosaic = db.Column(db.Boolean, default=False)
    flower_gate_padlock_correct_combination = db.Column(db.String(10), default='4685')
    flower_gate_padlock_combination_entered = db.Column(db.String(10), default='0000')
    solved_flower_gate_padlock = db.Column(db.Boolean, default=False)

    token = db.Column(db.String(32), unique=True, index=True)
    # token_expiration = db.Column(db.DateTime)

    # items = db.relationship('Item', backref='player', lazy=True)
    # puzzles = db.relationship("Puzzle", backref='player', lazy=True)
    

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.password = gen_pw_hash(kwargs['password'])
        db.session.add(self)
        db.session.commit()

    
    def __repr__(self):
        return f"<Player | {self.id}: {self.username}>"

    def check_password(self, password):
        return check_pw_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'current_location': self.current_location,
            'is_admin': self.is_admin,
            'new_game': self.new_game,
            'date_created': self.date_created,
            'hotbar_slot_1': Piece.query.get(self.hotbar_slot_1).to_dict(),
            'hotbar_slot_2': Piece.query.get(self.hotbar_slot_2).to_dict(),
            'hotbar_slot_3': Piece.query.get(self.hotbar_slot_3).to_dict(),
            'hotbar_slot_4': Piece.query.get(self.hotbar_slot_4).to_dict(),
            'hotbar_slot_5': Piece.query.get(self.hotbar_slot_5).to_dict(),
            'hotbar_slot_6': Piece.query.get(self.hotbar_slot_6).to_dict(),
            'hotbar_slot_7': Piece.query.get(self.hotbar_slot_7).to_dict(),

            'has_key_a': self.has_key_a,
            'selected_key_a': self.selected_key_a,
            'solved_gate_keyhole': self.solved_gate_keyhole,

            'has_coin': self.has_coin,
            'selected_coin': self.selected_coin,
            'solved_address_screws': self.solved_address_screws,

            'saw_address': self.saw_address,
            'saw_address_hidden_symbols': self.saw_address_hidden_symbols,
            'mailbox_box_correct_combination': self.mailbox_box_correct_combination,
            'mailbox_box_combination_entered': self.mailbox_box_combination_entered,
            'solved_mailbox_box': self.solved_mailbox_box,

            'has_red_gem': self.has_red_gem,
            'has_blue_gem': self.has_blue_gem,
            'has_green_gem': self.has_green_gem,
            'has_yellow_gem': self.has_yellow_gem,
            'selected_red_gem': self.selected_red_gem,
            'selected_blue_gem': self.selected_blue_gem,
            'selected_green_gem': self.selected_green_gem,
            'selected_yellow_gem': self.selected_yellow_gem,
            'saw_fountain_bench_animals': self.saw_fountain_bench_animals,
            'wall_fountains_correct_combination': self.wall_fountains_correct_combination,
            'wall_fountains_combination_entered': self.wall_fountains_combination_entered,
            'solved_wall_fountains': self.solved_wall_fountains,

            'has_telescope_lens': self.has_telescope_lens,
            'selected_telescope_lens': self.selected_telescope_lens,
            'solved_carved_trees_no_order': self.solved_carved_trees_no_order,

            'solved_house_door_key': self.solved_house_door_key,

            'saw_toolbox_note': self.saw_toolbox_note,
            'has_magnet': self.has_magnet,
            'selected_magnet': self.selected_magnet,
            'has_key_b': self.has_key_b,
            'selected_key_b': self.selected_key_b,
            'solved_toolbox': self.solved_toolbox,

            'has_key_c': self.has_key_c,
            'selected_key_c': self.selected_key_c,
            'solved_fountain_door': self.solved_fountain_door,

            'has_knife': self.has_knife,
            'selected_knife': self.selected_knife,
            'solved_fountain_bench_pillow': self.solved_fountain_bench_pillow,

            'saw_carved_trees': self.saw_carved_trees,
            'saw_compass_mosaic': self.saw_compass_mosaic,            
            'flower_gate_padlock_correct_combination': self.flower_gate_padlock_correct_combination,
            'flower_gate_padlock_combination_entered': self.flower_gate_padlock_combination_entered,
            'solved_flower_gate_padlock': self.solved_flower_gate_padlock
        }

    
    def get_token(self):
        if self.token:
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        db.session.commit()
        return self.token
    

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field not in {'username', 
                'email', 
                'password', 
                'current_location', 
                'new_game', 
                'is_admin', 
                'hotbar_slot_1',
                'hotbar_slot_2',
                'hotbar_slot_3',
                'hotbar_slot_4',
                'hotbar_slot_5',
                'hotbar_slot_6',
                'hotbar_slot_7',

                'has_key_a',
                'selected_key_a',
                'solved_gate_keyhole',

                'has_coin',
                'selected_coin',
                'solved_address_screws',

                'saw_address',
                'saw_address_hidden_symbols',
                'mailbox_box_correct_combination',
                'mailbox_box_combination_entered',
                'solved_mailbox_box',

                'has_red_gem',
                'has_blue_gem',
                'has_green_gem',
                'has_yellow_gem',
                'selected_red_gem',
                'selected_blue_gem',
                'selected_green_gem',
                'selected_yellow_gem',
                'wall_fountains_correct_combination',
                'wall_fountains_combination_entered',
                'saw_fountain_bench_animals',
                'solved_wall_fountains',

                'has_telescope_lens',
                'selected_telescope_lens',
                'solved_carved_trees_no_order',

                'solved_house_door_key',

                'saw_toolbox_note',
                'has_magnet',
                'selected_magnet',
                'has_key_b',
                'selected_key_b',
                'solved_toolbox',

                'has_key_c',
                'selected_key_c',
                'solved_fountain_door',

                'has_knife',
                'selected_knife',
                'solved_fountain_bench_pillow',

                'saw_carved_trees',
                'saw_compass_mosaic',            
                'flower_gate_padlock_correct_combination',
                'flower_gate_padlock_combination_entered',
                'solved_flower_gate_padlock'
                }:
                continue
            if field == 'password':
                setattr(self, field, gen_pw_hash(data[field]))
            else:
                setattr(self, field, data[field])
        db.session.commit()



        #############
        #           #
        #   PIECE   #
        #           #
        #############

# pieces are components that the player must find to solve the puzzles.
class Piece(db.Model):
    piece_id = db.Column(db.Integer, primary_key=True)
    piece_name = db.Column(db.String(50), nullable=False, unique=True)
    piece_description = db.Column(db.String(200), nullable=False)
    piece_image = db.Column(db.String(400), nullable=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Piece | {self.piece_id}: {self.piece_name}>"
    
    def to_dict(self):
        return {
            'piece_id': self.piece_id,
            'piece_name': self.piece_name,
            'piece_description': self.piece_description,
            'piece_image': self.piece_image
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, data):
        for field in data:
            if field not in {'piece_name', 'piece_description', 'piece_image'}:
                continue
            setattr(self, field, data[field])
        db.session.commit()




        ##############
        #            #
        #   PUZZLE   #
        #            #
        ##############
# puzzles are any obstruction or lock that the player has to figure out to continue
class Puzzle(db.Model):
    puzzle_id = db.Column(db.Integer, primary_key=True)
    puzzle_name = db.Column(db.String(50), nullable=False, unique=True)
    puzzle_description = db.Column(db.String(200), nullable=False)
    puzzle_image1 = db.Column(db.String(400), nullable=True)
    puzzle_image2 = db.Column(db.String(400), nullable=True)
    puzzle_image3 = db.Column(db.String(400), nullable=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Puzzle | {self.puzzle_id}: {self.puzzle_name}>"
    
    def to_dict(self):
        return {
            'puzzle_id': self.puzzle_id,
            'puzzle_name': self.puzzle_name,
            'puzzle_description': self.puzzle_description,
            'puzzle_image1': self.puzzle_image1,
            'puzzle_image2': self.puzzle_image2,
            'puzzle_image3': self.puzzle_image3
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, data):
        for field in data:
            if field not in {'puzzle_name', 'puzzle_description'}:
                continue
            setattr(self, field, data[field])
        db.session.commit()



        #####################
        #                   #
        #   PLAYER-PUZZLE   #
        #                   #
        #####################

# this is the transactional table that connects the player and puzzle so we can keep track of what they have tried to solve and how.
class PlayerPuzzle(db.Model):
    player_puzzle_id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    puzzle_id = db.Column(db.Integer, db.ForeignKey('puzzle.puzzle_id'), nullable=False)
    player_saw_puzzle = db.Column(db.Boolean, default=False)
    player_completed_puzzle = db.Column(db.Boolean, default=False)
    combination_player_entered = db.Column(db.String(50), nullable=True)
    correct_combination = db.Column(db.String(50), nullable=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Player_Puzzle | {self.player_puzzle_id}: {self.player_id}, {self.puzzle_id}>"
    
    def to_dict(self):
        return {
            'player_puzzle_id': self.player_puzzle_id,
            'player_id': Player.query.get(self.player_id).to_dict(),
            'puzzle_id': Puzzle.query.get(self.puzzle_id).to_dict(),
            'player_saw_puzzle': self.player_saw_puzzle,
            'player_completed_puzzle': self.player_completed_puzzle,
            'combination_player_entered': self.combination_player_entered,
            'correct_combination': self.correct_combination
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, data):
        for field in data:
            if field not in {
                'player_id',
                'puzzle_id', 
                'player_saw_puzzle',
                'player_completed_puzzle',
                'combination_player_entered',
                'correct_combination'
                }:
                continue
            setattr(self, field, data[field])
        db.session.commit()
    


        ###########################
        #                         #
        #   PLAYER-PUZZLE-PIECE   #
        #                         #
        ###########################

# this is the transactional table that connects the
#  player-puzzle table and piece table for tracking what
#  pieces go where and if they player has the piece
class PlayerPuzzlePiece(db.Model):
    player_puzzle_piece_id = db.Column(db.Integer, primary_key=True)
    player_puzzle_id = db.Column(db.Integer, db.ForeignKey('player_puzzle.player_puzzle_id'), nullable=False)
    piece_id = db.Column(db.Integer, db.ForeignKey('piece.piece_id'), nullable=False)
    player_saw_piece = db.Column(db.Boolean, default=False)
    player_has_piece = db.Column(db.Boolean, default=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Player_Puzzle_Piece | {self.player_puzzle_piece_id}: {self.player_puzzle_id}, {self.piece_id}>"
    
    def to_dict(self):
        # should self.piece_id be here or in Player hotbar
        return {
            'player_puzzle_piece_id': self.player_puzzle_piece_id,
            'player_puzzle_id': PlayerPuzzle.query.get(self.player_puzzle_id).to_dict(),
            'piece_id': Piece.query.get(self.piece_id).to_dict(),
            'player_saw_piece': self.player_saw_piece,
            'player_has_piece': self.player_has_piece
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, data):
        for field in data:
            if field not in {
                'player_puzzle_id',
                'piece_id', 
                'player_saw_piece',
                'player_has_piece',
                }:
                continue
            setattr(self, field, data[field])
        db.session.commit()