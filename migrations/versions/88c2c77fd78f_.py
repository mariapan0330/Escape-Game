"""empty message

Revision ID: 88c2c77fd78f
Revises: 
Create Date: 2022-09-09 22:58:44.557980

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88c2c77fd78f'
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
    sa.Column('hotbar_slot_1', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_2', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_3', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_4', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_5', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_6', sa.Integer(), nullable=True),
    sa.Column('hotbar_slot_7', sa.Integer(), nullable=True),
    sa.Column('token', sa.String(length=32), nullable=True),
    sa.ForeignKeyConstraint(['hotbar_slot_1'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['hotbar_slot_2'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['hotbar_slot_3'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['hotbar_slot_4'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['hotbar_slot_5'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['hotbar_slot_6'], ['piece.piece_id'], ),
    sa.ForeignKeyConstraint(['hotbar_slot_7'], ['piece.piece_id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_index(op.f('ix_player_token'), 'player', ['token'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_player_token'), table_name='player')
    op.drop_table('player')
    op.drop_table('piece')
    # ### end Alembic commands ###