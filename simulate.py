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

ref = db.collection('users').document('7mYbml6IeHgwaRrMs1Y6')
player_teams = ref.get({u'teams'})._data['teams']
print(player_teams)

i = -1
for short_name in player_teams:
    i += 1
    for long_name in teams:
        if short_name.strip() == 'Bucs':
            player_teams[i] = 'Tampa Bay Buccaneers'
            break
        elif short_name.strip() == 'Jags':
            player_teams[i] = 'Jacksonville Jaguars'
            break
        elif short_name.strip() in long_name:
            player_teams[i] = long_name
            break
print(player_teams)

ref.update({u'teams':player_teams})