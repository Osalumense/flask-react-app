import json
from flask import jsonify
# from dotenv import dotenv_values

def load_db():
    with open("db.json") as f:
        return json.load(f)
def add_to_db(args):
    todos = load_db()
    new_recs = []
    for todo in todos:
        if todo["id"] == todos["id"]:
            todo["id"] == todos["id"]
            todo["task"] == todos["task"]
            todo["summary"] == todos["summary"]
        new_recs.append(todo)
    with open("db.json", "w") as f:
        f.write(json.dumps(args, indent=2))
    return jsonify(todos)

db = load_db()