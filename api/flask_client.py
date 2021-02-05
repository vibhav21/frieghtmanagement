import json
import threading
import time


from flask import Flask,request,jsonify
from bson.json_util import dumps, loads 

from mqtt_class import MQTT
from pymongo import MongoClient
import pymongo


app = Flask(__name__)

@app.route("/user",methods=['GET'])
def UserLogin():
	db_client = MongoClient('mongodb://localhost:27017')
	db= db_client['freightmanagement']
	collection = db['user']
	documents=collection.find()
	response = []
	for document in documents:
		document['_id'] = str(document['_id'])
		response.append(document)
	return json.dumps(response)


@app.route('/data/<int:id>',methods=['GET','POST'])
def data(id):
	print(id)
	db_client = MongoClient('mongodb://localhost:27017')
	db = db_client['freightmanagement']
	collection = db['telemetry_data']
	page = collection.find({'truck_id':int(id)}).sort([('time',-1),]).limit(10)
	list_cur = list(page)
	json_data = dumps(list_cur, indent = 2)
	with open("data.json","w") as file:
		file.write(json_data)
	return json_data

@app.route('/addtruck',methods=['GET','POST'])
def add_truck():
    item=request.json
    db_client = MongoClient('mongodb://localhost:27017')
    db = db_client['freightmanagement']
    collection = db['truckData']
    b=collection.insert_one(item).inserted_id
    return {"time":time.asctime()}

def print_message(mqtt_object):
	while 1:
		item = mqtt_object.q.get()
		db_client = MongoClient('mongodb://localhost:27017')
		db = db_client['freightmanagement']
		collection = db['telemetry_data']
		b=collection.insert_one(item).inserted_id
		print("{} got submitted".format(b))
		mqtt_object.q.task_done()

#print("in main")
with open("config.json", "r") as file:
	config = json.load(file)

mqtt_object = MQTT('second', config)

threading.Thread(target=print_message, args=(mqtt_object,)).start()
mqtt_object.client.loop_start()
# if __name__ == "__main__":

# 	#print("in thread",mqtt_object)
	
	
	
# 	app.run(host='localhost', port=5000 ,debug=True)