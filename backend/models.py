from . import db
from datetime import datetime
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = "user"

    id              = db.Column(db.Integer, primary_key=True)
    username        = db.Column(db.String(255), unique=True, nullable=False)
    email           = db.Column(db.String(255), unique=True, nullable=False)
    first_name      = db.Column(db.String(255), unique=False, nullable=True)
    last_name       = db.Column(db.String(255), unique=False, nullable=True)
    password        = db.Column(db.String(255), unique=False, nullable=False)
    is_admin        = db.Column(db.Boolean, default=False)
    authenticated   = db.Column(db.Boolean, default=False)
    api_key         = db.Column(db.String(255), unique=True, nullable=True)
    created_at      = db.Column(db.DateTime, default=datetime.now)
    updated_at      = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)