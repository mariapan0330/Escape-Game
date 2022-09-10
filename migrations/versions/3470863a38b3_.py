"""empty message

Revision ID: 3470863a38b3
Revises: 88c2c77fd78f
Create Date: 2022-09-09 23:34:12.559805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3470863a38b3'
down_revision = '88c2c77fd78f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('puzzle',
    sa.Column('puzzle_id', sa.Integer(), nullable=False),
    sa.Column('puzzle_name', sa.String(length=50), nullable=False),
    sa.Column('puzzle_description', sa.String(length=200), nullable=False),
    sa.Column('puzzle_image', sa.String(length=400), nullable=True),
    sa.PrimaryKeyConstraint('puzzle_id'),
    sa.UniqueConstraint('puzzle_name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('puzzle')
    # ### end Alembic commands ###