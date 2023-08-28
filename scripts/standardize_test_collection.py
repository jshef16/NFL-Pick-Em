
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# connect to database
cred = credentials.Certificate("nfl-pickem-6d43f-firebase-adminsdk-tuw35-496e6443da.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Retrieve documents from the collection
user_ref = db.collection('users')
test_ref = db.collection('test')
user_docs = user_ref.stream()
test_docs = test_ref.stream()

for doc in test_docs:
    test_ref.document(doc.id).delete()

for doc in user_docs:
    test_ref.document().set(doc._data)
