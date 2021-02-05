import random
import time
import threading
import json
from mqtt_class import MQTT


def data_generation(mqtt1, truck_id):
    while 1:
        data = {}
        for parameter in config["parameters"]:
            if parameter["parameter_name"] == "location":
                location = {}
                location["longitude"] = str(random.uniform(parameter["longitude_min_value"], parameter["longitude_max_value"]))
                location["latitude"] = str(random.uniform(parameter["latitude_min_value"], parameter["latitude_max_value"]))
                value = location
            elif parameter["parameter_name"] == "time":
                value = time.asctime()
            else:
                value = str(random.uniform(parameter["parameter_min_value"], parameter["parameter_max_value"])) + ' ' + parameter["parameter_unit"]
            key = parameter["parameter_name"]
            data[key] = value
            data["truck_id"] = truck_id
        print(data)
        mqtt1.client.publish(config["Topic"], str(json.dumps(data)))
        time.sleep(config["mqtt_data_freq"])


if __name__ == '__main__':

    with open("config.json", "r") as file:
        config = json.load(file)
    mqtt1 = MQTT('one',config)
    mqtt2 = MQTT('two',config)
    mqtt3 = MQTT('three',config)
    mqtt4 = MQTT('four',config)
    mqtt5 = MQTT('five',config)
    mqtt6 = MQTT('six',config)
    mqtt7 = MQTT('seven',config)
    mqtt8 = MQTT('eight',config)
    mqtt9 = MQTT('nine',config)
    mqtt10 = MQTT('ten',config)
    # mqtt_array = [MQTT(i, config) for i in range(1, 11)]
    # i = 0
    # for mqtt_obj in mqtt_array:
    #     i = i + 1
    #     threading.Thread(target=data_generation,args=(mqtt_obj, i)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt10,10)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt2,2)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt3,3)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt4,4)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt5,5)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt6,6)).start()
    threading.Thread(target=data_generation  ,daemon=True,args=(mqtt7,7)).start()
    threading.Thread(target=data_generation  ,daemon=True,args=(mqtt8,8)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt9,9)).start()
    threading.Thread(target=data_generation ,daemon=True ,args=(mqtt10,10)).start()

    while True:
        pass
