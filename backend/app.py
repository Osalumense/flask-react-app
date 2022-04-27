from flask import Flask, render_template, jsonify, make_response
import pymysql
# from model import db, add_to_db
from datetime import datetime
from flask_login import UserMixin
from flask_restful import Resource, Api, request, reqparse, abort
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import check_password_hash
from flask_bcrypt import Bcrypt


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config["JWT_SECRET_KEY"] = "sdfdfkil%^&*kjsi*&^13245654345tgfgtgvcfdfgfvcd"
jwt = JWTManager(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'test'

mysql = MySQL(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost:3306/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    __tablename__ = "user"
    id              = db.Column(db.Integer, primary_key=True)
    email           = db.Column(db.String(255), unique=True, nullable=False)
    first_name      = db.Column(db.String(40), unique=False, nullable=True)
    last_name       = db.Column(db.String(40), unique=False, nullable=True)
    middle_name     = db.Column(db.String(40), unique=False, nullable=True)
    password        = db.Column(db.String(255), unique=False, nullable=False)
    remember_token  = db.Column(db.String(255), unique=False, nullable=True)
    is_admin        = db.Column(db.Boolean, default=False)
    dob             = db.Column(db.Date, unique=False)
    mobile_number   = db.Column(db.String(15), unique=True, nullable=True)
    created_at      = db.Column(db.DateTime, default=datetime.now)
    updated_at      = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_json(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'middle_name': self.middle_name,
            'is_admin': self.is_admin,
            'is_active': True,
        }

# db.create_all

# task_post_args = reqparse.RequestParser()
# task_post_args.add_argument("id", type=int, help="ID can't be empty", required=True)
# task_post_args.add_argument("task", type=str, help="Task is required", required=True)
# task_post_args.add_argument("summary", type=str, help="Summary is required", required=True)

# api = Api(app)
# class ToDo(Resource):
    
#     def get(self, todo_id):
#         todos = db
#         return todos[todo_id]

#     # def post(self, todo_id):
#     #     todos = db
#     #     args = task_post_args.parse_args()
#     #     if todo_id in todos:
#     #         abort(409, "Task ID already exists")
#     #     add_to_db(args)

# class ToDoList(Resource):
#     def get(self):
#         return jsonify(db)

# class ToDoAdd(Resource):
#     def post(self):
#         todos = []
#         todos += db
#         args = task_post_args.parse_args()
#         # return jsonify(args)
#         todo_id = args["id"]
#         max_id = todos[len(db)-1]["id"]
#         if todo_id <= max_id:
#             abort(409, "Task ID already exists")
#         todos += {"id": args["id"], "task": args["task"], "summary": args["summary"]}
#         return jsonify(todos)
#         if todo_id in todos["id"]:
#             abort(409, "Task ID already exists")
#         add_to_db(args)


# api.add_resource(ToDo, '/api/todos/<int:todo_id>')
# api.add_resource(ToDoList, '/api/todos')
# api.add_resource(ToDoAdd, '/api/todos/add')


@app.route('/')
def show_home():
    return "Hello flask is here"

# @app.route('/<password>')
# def index(password):
#     bcrypt = Bcrypt()
#     # hashed_value = bcrypt.generate_password_hash(password).decode('utf-8')
#     # return hashed_value
#     stored_pwd = "$2b$12$TyLT6sLMdwZURSkmEa.ReuiBPTYdBE/v2LVSykpZpJvVoLgKSFzuS"
#     result = bcrypt.check_password_hash(stored_pwd, password)
#     return str(result)
   

@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    middle_name = request.json.get("middle_name", None)
    mobile_number = request.json.get("mobile_number", None)
    email = request.json.get("email", None)
    dob = request.json.get("dob", None)
    password = request.json.get("password", None)
    hashed_password = Bcrypt().generate_password_hash(password).decode('utf-8')

    user = User()
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.password = hashed_password
    user.middle_name = middle_name
    user.mobile_number = mobile_number
    user.dob = dob

    db.session.add(user)
    db.session.commit()

    response = jsonify({'message': 'User created successfully'})
    
    return response
    


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user:
        if Bcrypt().check_password_hash(user.password, password):
            access_token = create_access_token(identity=email)
            return make_response(jsonify({'message': 'Login successful', 'access_token': access_token, 'user': user.to_json()}))
    
    return make_response(jsonify({'message': 'Username or password not correct.'}), 401)
