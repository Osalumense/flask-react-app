from flask import Flask, render_template, jsonify
# from model import db, add_to_db
from flask import Flask
from flask_restful import Resource, Api, request, reqparse, abort
from flask_mysqldb import MySQL
# from flask_sqlalchemy import SQLAlchemy
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

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/flask-learn'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)
# class UserInfo(db.Model):
#     id = db.Column(db.Integer, primary_key = True)
#     username = db.Column(db.String(100), unique = True)
#     password = db.Column(db.String(100))

#     def __init__(self, username, password):
#         self.username = username
#         self.password = password


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

@app.route('/<password>')
def index(password):
    bcrypt = Bcrypt()
    # hashed_value = bcrypt.generate_password_hash(password).decode('utf-8')
    # return hashed_value
    stored_pwd = "$2b$12$TyLT6sLMdwZURSkmEa.ReuiBPTYdBE/v2LVSykpZpJvVoLgKSFzuS"
    result = bcrypt.check_password_hash(stored_pwd, password)
    return str(result)


    # hashed_value = generate_password_hash(password)
    # stored_pwd = "260000$HuOyEa3ChqIQ08pQ$e33aed16500c0e79b9dc0e5f0de00b3f70e6a8164669ef325acea77ff9b4b8bf"
   

@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    # return jsonify(data)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    bcrypt = Bcrypt()
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", [email])
    record = cur.fetchone()
    if bcrypt.check_password_hash(record.password, password): 
        return jsonify(record)
    return "Error"
    # if email != "harkugbeosaz@gmail.com" or password != "password":
    #     return jsonify({"msg": "Bad username or password"}), 401

    # access_token = create_access_token(identity=email)
    # return jsonify(access_token=access_token)
