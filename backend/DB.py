from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import sys 

uri= f"mongodb+srv://siddardhakumarkavurikbe25:Siddu2003@sidhardha.g5zcqjd.mongodb.net/?retryWrites=true&w=majority&appName=sidhardha"
print(uri)
client = MongoClient(uri,server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    # db=client['project']
    # collection=db['answers' if sys.argv[2].startswith('answer') else "students"]

    # if sys.argv[2].startswith('answer'):
    #     document = {
    #     "rollno": list(sys.argv[2].split('_'))[1],
    #     "answer": "",
    #     }
    # else:
    #     document = {
    #     "Id": list(sys.argv[2].split('_'))[1],
    #     "answer": "",
    #     }
        
    # insert_result = collection.insert_one(document)

    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
