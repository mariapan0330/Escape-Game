"""empty message

Revision ID: b677cdf69ba2
Revises: af6c373b96a5
Create Date: 2022-09-10 01:34:30.519956

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b677cdf69ba2'
down_revision = 'af6c373b96a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
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
    # ### end Alembic commands ###