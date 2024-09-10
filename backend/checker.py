import spacy
nlp=spacy.load('en_core_web_sm')
from spellchecker import SpellChecker
from happytransformer import HappyTextToText, TTSettings
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import sys
import math;

load_dotenv()

try:
    client = MongoClient("mongodb+srv://"+os.getenv('DB_USER')+":"+os.getenv('DB_PASSWORD')+"@sidhardha.g5zcqjd.mongodb.net/?retryWrites=true&w=majority&appName=sidhardha",server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
    db=client['project']
    collection=db["students"]

    results = collection.find()
except:
    client.close()

def calculate_score(similarity_score, grammar_errors,length_text):
    # Ensure similarity_score is between 0 and 1
    if not (0 <= similarity_score <= 1):
        raise ValueError("Similarity score must be between 0 and 1.")

    # Define weights
    weight_similarity = 0.999
    weight_grammar = 0.001

    # Normalize grammar errors and spelling mistakes
    # Assuming a reasonable max number for normalization (you may adjust these values)
    max_grammar_errors = length_text

    normalized_grammar_errors = 1 - min(grammar_errors / max_grammar_errors, 1)

    # Calculate weighted score
    final_score = (
        weight_similarity * similarity_score +
        weight_grammar * normalized_grammar_errors
    )

    return final_score


def get_sentence_embedding(sentence):
    return model.encode(sentence)
def Combiner(tokens):
    lis=[]
    i=0
    s=''
    while i <len(tokens):
        if  '-' in tokens[i]:
            s=tokens[i][:-1]+tokens[i+1]
            i+=1
        else:
            s=tokens[i]
            lis.append(s)
        i+=1
    s=lis[0]
    for i in range(1,len(lis)):
        s=s+" "+lis[i]
    return s
def remove_similar_sentences(sentences):
    unique_sentences = []
    for sentence in sentences:
        sentence_embedding = get_sentence_embedding(sentence)
        is_unique = True
        for unique_sentence in unique_sentences:
            unique_embedding = get_sentence_embedding(unique_sentence)
            similarity = cosine_similarity([sentence_embedding], [unique_embedding])[0][0]
            if similarity > 0.8:  # Adjust the threshold as needed
                is_unique = False
                break
        if is_unique:
            unique_sentences.append(sentence)
    return unique_sentences

model= SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")

args = TTSettings(num_beams=10, min_length=2,max_length=100)

for query in results:
    print(results)
    print(query)
    answer=query['answer']
    tokens=nlp(answer)

    def separate_punc(doc_text):
        return [token.text.lower() for token in nlp(doc_text) if token.text not in '\n\n \n\n\n!"-#$%&()--*+-/:;<=>?@[\\]^_`{|}~\t\n ']

    tokens=separate_punc(tokens)
    modifiedanswer=Combiner(tokens)

    tokens=nlp(modifiedanswer)
    wordslist=[]
    for i in tokens:
        wordslist.append(i.text)
    spell = SpellChecker()
    spellcount=0
    misspelled = spell.unknown(wordslist)

    for word in misspelled:
        if spell.correction(word):
            spellcount+=1

    sentencelist=[i.text for i in tokens.sents]
    gcheckedsentence=''
    for i in range(len(sentencelist)):
        result = happy_tt.generate_text('grammar: '+sentencelist[i], args=args)
        gcheckedsentence=gcheckedsentence+result.text+" "

    token=nlp(gcheckedsentence)
    sentences=[ i.text for i in token.sents]
    unique_sentences = remove_similar_sentences(sentences)
    usentence=''
    for sentence in unique_sentences:
        usentence=usentence+" "+sentence
    lis=[]

    collection=db["answers"]
    answers= collection.find({"qno":query['qno']})
    relative=0.0
    for x in answers:
        mar=x['marks']
        sentences =[usentence,x['answer']]
        embeddings = model.encode(sentences)
        result=cosine_similarity([embeddings[0]],[embeddings[1]])
        relative=max(relative,result[0][0])
    print(relative)
    collection=db["students"]    
    score=calculate_score(float(relative),spellcount,len(list(token.text)))
    document = {
        "rollno":query['rollno'],
        "answer": usentence,
        "related":float(relative),
        "spell":spellcount,
        "qno":query['qno'],
        "len":len(list(token.text)),
        "score": math.floor(float(score)*float(mar)),
        "total": float(mar),
        }
    try:
        print("inside")
        collection=db["students"]
        print("executed")
        collection.update_one({"rollno":query['rollno'],"qno":query['qno']},{"$set":document})
        print("completed")
    except Exception as e:
        print(e)
        client.close()


client.close()
sys.exit(0)