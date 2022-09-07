"""
from app import app
from flask import render_template, render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from app.forms import SignUpForm, LoginForm
from app.models import User


@app.route('/')
def index():
    return render_template('index.html')


# @app.route('/signup')
# def signup():
#     return render_template('/signup.html')

# @app.route('/login')
# def signup():
#     return render_template('/login.html')
"""