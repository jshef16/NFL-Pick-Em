import csv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

players = {'gabe':{'teams':[], 'scores':[]}, 'jacob':{'teams':[], 'scores':[]}, 'shef':{'teams':[], 'scores':[]}, 'sherm':{'teams':[], 'scores':[]}}

with open('Copy of NFL Pick \'Em - Sheet1.csv', mode ='r')as file:
   
  # reading the CSV file
  csvFile = csv.reader(file)
 
  # displaying the contents of the CSV file
  for lines in csvFile:
        for i, player in enumerate(players):
            if 'Total' in lines[0]:
                break
            elif 'Differential' in lines[0]:
                if lines[1] == '':
                    continue
                players[player]['scores'].append(int(lines[i + 1]))
            else:
                players[player]['teams'].append(lines[i + 1])

for player in players:
    total = 0
    for num in players[player]['scores']:
        total += num
    print(player + "'s total: " + str(total))


cred = credentials.Certificate("nfl-pickem-6d43f-firebase-adminsdk-tuw35-496e6443da.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

ref = db.collection('users').document('kVLkqwh6Xj4BD0nJrCll')
ref.update({'scores':players['sherm']['scores']})
ref = db.collection('users').document('kVLkqwh6Xj4BD0nJrCll')
ref.update({'teams':players['sherm']['teams']})

print("success")