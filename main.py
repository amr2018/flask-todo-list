
import sqlite3
from uuid import uuid4
import threading

# conn = sqlite3.connect('test.db')

# # create table
# c = conn.cursor()
# c.execute(""" create table if not exists tasks (id, name, des, done)""")


# add tasks to database

def add_task(conn, name, des):
	c = conn.cursor()
	task_id = str(uuid4())
	c.execute(f""" insert into tasks values ("{task_id}", "{name}","{des}", {0}) """)
	conn.commit()


def update_task(conn, task_id):
	c = conn.cursor()
	c.execute(f""" update tasks set done = "{1}" where id = "{task_id}" """)
	conn.commit()

def delete_task(conn, task_id):
	c = conn.cursor()
	c.execute(f""" delete from tasks where id = "{task_id}" """)
	conn.commit()

def get_all_tasks(conn):
	c = conn.cursor()
	result = c.execute(""" select * from tasks """)
	return result.fetchall()



from flask import Flask, request, render_template, url_for

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('index.html')

# for add task
@app.route('/api/v1/add_task', methods=['POST', 'GET'])
def add_task_route():
    data = request.get_json()
    name = data['name']
    des = data['des']

    try:
    	conn = sqlite3.connect('test.db')
    	add_task(conn, name, des)
    	return {"msg": "task added ;)"}
    except:
    	return {"error": "error"}


# show all tasks
@app.route('/api/v1/get_task', methods=['POST', 'GET'])
def get_tasks_route():
    try:
    	conn = sqlite3.connect('test.db')
    	return {"tasks": get_all_tasks(conn)}
    except:
    	return {"error": "error"}


# update task
@app.route('/api/v1/update_task', methods=['POST', 'GET'])
def update_task_route():
    data = request.get_json()
    task_id = data['task_id']
    try:
    	conn = sqlite3.connect('test.db')
    	update_task(conn, task_id)
    	return {"msg": "Done"}
    except:
    	return {"error": "error"}


# delete task
@app.route('/api/v1/delete_task', methods=['POST', 'GET'])
def delete_task_route():
    data = request.get_json()
    task_id = data['task_id']
    try:
    	conn = sqlite3.connect('test.db')
    	delete_task(conn, task_id)
    	return {"msg": "Done"}
    except:
    	return {"error": "error"}


if __name__ == "__main__":
	app.run(debug=True)
