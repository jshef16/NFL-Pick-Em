import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# GET request from ESPN API
r = requests.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
d = json.loads(r.content)

numGames = 0
boxScores = {}

# loop thru most recent games
for game in d['events']:
    # find home and away team names
    name = game['name']
    index = name.find(' at ')
    if index != -1:
        aTeam = name.split(' at ')[0].strip()
        hTeam = name.split(' at ')[1].strip()
    else:
        aTeam = name.split('vs')[0].strip()
        hTeam = name.split('vs')[1].strip()

    # find home and away team scores
    competitors = game['competitions'][0]['competitors']
    for competitor in competitors:
        if competitor['homeAway'] == 'home':
            hScore = int(competitor['score'])
        else:
            aScore = int(competitor['score'])

    print(aTeam + ' @ ' + hTeam + ': ' + str(aScore) + '-' + str(hScore))

    # compute game scores 
    boxScores[hTeam] = hScore - aScore
    boxScores[aTeam] = aScore - hScore
    
    numGames += 1




  
# connect to database
cred = credentials.Certificate("/Users/jordanshefman/Desktop/NFL-Pick-Em/nfl-pickem-6d43f-firebase-adminsdk-tuw35-496e6443da.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Retrieve documents from the collection
collection_ref = db.collection('users2023')
documents = collection_ref.stream()

# Update each document by adding the new field
for document in documents:
    weekScores = []
    weekTeams = document._data['weekTeams']
    for team in weekTeams:
        weekScores.append(boxScores[team])

    document_ref = collection_ref.document(document.id)
    
    # update teams list in db
    teams = document._data['teams']
    teams.extend(weekTeams)
    document_ref.update({"teams": teams})

    # update scores list in db
    scores = document._data['scores']
    scores.extend(weekScores)
    document_ref.update({"scores": scores})

    # increment total in db
    for score in weekScores:
        document_ref.update({"total": firestore.Increment(score + 100)})

    document_ref.update({"weekTeams": []})