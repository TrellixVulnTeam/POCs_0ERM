from flask import Blueprint

bp = Blueprint('main', __name__)

from flask_mongodb.main import routes