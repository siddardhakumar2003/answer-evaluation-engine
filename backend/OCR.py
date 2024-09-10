import boto3
import os
from dotenv import load_dotenv
import boto3.session
import sys 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


load_dotenv()
object_key = sys.argv[1] #input
name=sys.argv[2] #input
bucket_name = os.getenv('S3_BUCKET_NAME')

my_session = boto3.session.Session(
    region_name='ap-south-1',
    aws_access_key_id=os.getenv('AWS_SECRET_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_ACCESS_KEY_ID')
    )
client = my_session.client(
    's3',
    aws_access_key_id=os.getenv('AWS_SECRET_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_session_token=my_session,
    region_name='ap-south-1'
)
s3 = my_session.resource('s3')
with open(object_key, 'rb') as data:
    x=s3.Bucket(os.getenv('S3_BUCKET_NAME')).put_object(Key=name, Body=data)
textract_client = my_session.client('textract')

# Call DetectText API to perform OCR on the image
response = textract_client.start_document_text_detection(
    DocumentLocation={
        'S3Object': {
            'Bucket': bucket_name,
            'Name':name
        }
    }
)

job_id = response['JobId']
while True:
    job_status = textract_client.get_document_text_detection(JobId=job_id)
    status = job_status['JobStatus']
    if status == 'SUCCEEDED':
        break
    elif status == 'FAILED':
        print('Text detection failed')
        break
    else:
        continue
answer = ''
for item in job_status['Blocks']:
    if item['BlockType'] == 'LINE':
        answer += item['Text'] + '\n'

# Print the extracted text
print(answer)

s3.Object(bucket_name,name).delete()

# Create a new client and connect to the server
client = MongoClient("mongodb+srv://"+os.getenv('DB_USER')+":"+os.getenv('DB_PASSWORD')+"@sidhardha.g5zcqjd.mongodb.net/?retryWrites=true&w=majority&appName=sidhardha",server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    db=client['project']
    collection=db['answers' if sys.argv[2].startswith('answer') else "students"]
    for x in answer.split(r'% %'+'\n'):
        i=0
        q=0
        while x[i] not in '.)':
            if x[i].isdigit():
                q=q*10+int(x[i])
            i+=1
        if sys.argv[2].startswith('answer'):
            document = {
            "Id": list(sys.argv[2].split('_'))[1],
            "answer": x[i+1:-4],
            "qno":q,
            "marks":x[-3:-2],
            }
        else:
            document = {
            "rollno": list(sys.argv[2].split('_'))[1],
            "answer": x[i+1:],
            "related":0.0,
            "qno":q,
            "spell":0,
            "len":0,
        }
        insert_result = collection.insert_one(document)

    print("Pinged your deployment. You successfully connected to MongoDB!")
    client.close()
except Exception as e:
    print(e)
    client.close()
sys.exit(0)

