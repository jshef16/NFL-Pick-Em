import csv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


teams = [
    'Arizona Cardinals',
    'Atlanta Falcons',
    'Baltimore Ravens',
    'Buffalo Bills',
    'Carolina Panthers',
    'Chicago Bears',
    'Cincinnati Bengals',
    'Cleveland Browns',
    'Dallas Cowboys',
    'Denver Broncos',
    'Detroit Lions',
    'Green Bay Packers',
    'Houston Texans',
    'Indianapolis Colts',
    'Jacksonville Jaguars',
    'Kansas City Chiefs',
    'Las Vegas Raiders',
    'Los Angeles Chargers',
    'Los Angeles Rams',
    'Miami Dolphins',
    'Minnesota Vikings',
    'New England Patriots',
    'New Orleans Saints',
    'New York Giants',
    'New York Jets',
    'Philadelphia Eagles',
    'Pittsburgh Steelers',
    'San Francisco 49ers',
    'Seattle Seahawks',
    'Tampa Bay Buccaneers',
    'Tennessee Titans',
    'Washington Commanders'
  ]
  

cred = credentials.Certificate("nfl-pickem-6d43f-firebase-adminsdk-tuw35-496e6443da.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


# Retrieve documents from the collection
collection_ref = db.collection('users2023')
documents = collection_ref.stream()

# Update each document by adding the new field
for document in documents:
    document_ref = collection_ref.document(document.id)
    document_ref.update({'weekTeams': [], 'scores' : [], 'teams' : [], 'total' : 0})
