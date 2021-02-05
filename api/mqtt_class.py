import paho.mqtt.client as mqtt
import json
import queue


class MQTT:
    """
	this class basically helps in easy initialization of client for mqtt protocol

	"""

    def __init__(self, instance, config):
        """
		this python constructor do the following
		1) intialzie client
		2)intialzing callback functions
		3)connectiong to the broker
		:param instance:
		:param config:
		"""
        try:
            self.q = queue.Queue()
            self.client = mqtt.Client(instance)
            self.config = config
            self.broker_address = self.config["mqtt_configuration"]["server_url"]

            # assign mqtt event callbacks
            self.client.on_message = self.on_message
            #self.client.on_publish=self.on_publish
            self.client.on_connect = self.on_connect
            self.client.connect(self.broker_address, 1883, 60)

        except Exception as e:
            print(e)

    def on_message(self, client, userdata, message):
        """
		this method helps in decoding the payload.Converting it in dictionary.Appending that dictionary to a json file
		and printing the payload to the console.
		:param client:
		:param userdata:
		:param message:Encoded payload message
		:return:
		"""
        decoded_message = message.payload.decode("utf-8")
        #print(decoded_message)
        self.set_message(decoded_message)

    # decoded_message = json.loads(decoded_message)
    # with open("temp.json", "r+") as file:
    #     file_data = json.load(file)
    #     file_data['data'].append(decoded_message)
    #     file.seek(0)  # To bring back the pointer to the start of the file
    #     json.dump(file_data, file)
    # print("message received ", str(message.payload.decode("utf-8")))

    def on_connect(self, client, userdata, flags, rc):
        """
		This method run when connection is made and Subscibe to a particular Topic
		:param client:
		:param userdata:
		:param flags:
		:param rc:
		:return:
		"""
        print("connected")
        self.client.subscribe(self.config["Topic"])


    def set_message(self, decoded_message):
        decoded_message = json.loads(decoded_message)
        self.q.put(decoded_message)
    # with open("temp.json", "r+") as file:
    #     file_data = json.load(file)
    #     file_data['data'].append(decoded_message)
    #     file.seek(0)  # To bring back the pointer to the start of the file
    #     json.dump(file_data, file)
    # #print("message received ", str(decoded_message.payload.decode("utf-8")))
