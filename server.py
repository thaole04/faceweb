import pymongo
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
uri = "mongodb+srv://thaole04:041003@facerecognition.tcpw49j.mongodb.net/?retryWrites=true&w=majority"

# Kết nối tới MongoDB
try:
    client = MongoClient(uri)
    db = client['mydatabase']
    print("Kết nối thành công!")
except ConnectionFailure:
    print("Không thể kết nối tới MongoDB. Vui lòng kiểm tra kết nối.")

# Định nghĩa hàm lắng nghe sự thay đổi
def watch_changes():
    with db['controls'].watch() as stream:
        for change in stream:
            operation_type = change['operationType']
            document = change['fullDocument']
            print(f"Operation Type: {operation_type}")
            print(f"Document: {document}")
            if document["type"] == 'on':
                print("on...")

if __name__ == '__main__':
    watch_changes()
