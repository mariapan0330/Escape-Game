"""empty message

Revision ID: 088aa5d64c23
Revises: 
Create Date: 2022-09-12 15:22:33.257657

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '088aa5d64c23'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('piece',
    sa.Column('piece_id', sa.Integer(), nullable=False),
    sa.Column('piece_name', sa.String(length=50), nullable=False),
    sa.Column('piece_description', sa.String(length=200), nullable=False),
    sa.Column('piece_image', sa.String(length=400), nullable=True),
    sa.PrimaryKeyConstraint('piece_id'),
    sa.UniqueConstraint('piece_name')
    )
    op.create_table('player',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.Column('current_location', sa.String(length=100), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.Column('new_game', sa.Boolean(), nullable=True),
    sa.Column('hotbar_slot_1', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_2', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_3', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_4', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_5', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_6', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_7', sa.Integer(), nullable=True),
    sa.Column('token', sa.String(length=32), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_index(op.f('ix_player_token'), 'player', ['token'], unique=True)
    op.create_table('puzzle',
    sa.Column('puzzle_id', sa.Integer(), nullable=False),
    sa.Column('puzzle_name', sa.String(length=50), nullable=False),
    sa.Column('puzzle_description', sa.String(length=200), nullable=False),
    sa.Column('puzzle_image1', sa.String(length=400), nullable=True),
    sa.Column('puzzle_image2', sa.String(length=400), nullable=True),
    sa.Column('puzzle_image3', sa.String(length=400), nullable=True),
    sa.PrimaryKeyConstraint('puzzle_id'),
    sa.UniqueConstraint('puzzle_name')
    )
    op.create_table('player_puzzle',
    sa.Column('player_puzzle_id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('puzzle_id', sa.Integer(), nullable=False),
    sa.Column('player_saw_puzzle', sa.Boolean(), nullable=True),
    sa.Column('player_completed_puzzle', sa.Boolean(), nullable=True),
    sa.Column('combination_player_entered', sa.String(length=50), nullable=True),
    sa.Column('correct_combination', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['player_id'], ['player.id'], ),
    sa.ForeignKeyConstraint(['puzzle_id'], ['puzzle.puzzle_id'], ),
    sa.PrimaryKeyConstraint('player_puzzle_id')
    )
    op.create_table('player_puzzle_piece',
    sa.Column('player_puzzle_piece_id', sa.Integer(), nullable=False),
    sa.Column('player_puzzle_id', sa.Integer(), nullable=False),
    sa.Column('piece_id', sa.Integer(), nullable=False),
    sa.Column('player_saw_piece', sa.Boolean(), nullable=True),
    sa.Column('player_has_piece', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['piece_id'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['player_puzzle_id'], ['player_puzzle.player_puzzle_id'], ),
    sa.PrimaryKeyConstraint('player_puzzle_piece_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('player_puzzle_piece')
    op.drop_table('player_puzzle')
    op.drop_table('puzzle')
    op.drop_index(op.f('ix_player_token'), table_name='player')
    op.drop_table('player')
    op.drop_table('piece')
    # ### end Alembic commands ###