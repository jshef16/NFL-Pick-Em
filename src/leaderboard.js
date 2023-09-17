const table = document.getElementById('leaders'); // get the table element
const rows = table.getElementsByTagName('tr'); // get all the rows in the table
const max_id = document.getElementById('max'); // get the max element

window.onload = async function() {
    compute_scores()
    table.innerHTML = await create_table()
    sortTable(1)
    make_rows_clickable()
    // high_week()
}

async function create_table() {
    var inner = "<thead><tr><th>Name</th><th>Score</th></tr></thead><tbody>";
    
    const snapshot = await db.collection('users2023').get();
    snapshot.docs.forEach(doc => {
      const add_text = "<tr><td style='text-align: left;'>" + doc.data()['first'] + " " + doc.data()['last'] + "<span style='display: none'> (" + doc.data()['email'] + ") </span> </td><td>" + doc.data()['total'] + "</td></tr>"
      inner += add_text;
    })
    inner += "</tbody>";
    return inner;
  }
  
  function sortTable(n) {
    const table = document.getElementById('leaders');
    const rows = Array.from(table.rows).slice(1);
    rows.sort((a, b) => {
      const aValue = parseFloat(a.cells[n].textContent);
      const bValue = parseFloat(b.cells[n].textContent);
      return bValue - aValue;
    });
    table.tBodies[0].append(...rows);
  }
  
  document.querySelectorAll('#leaders th').forEach((th, i) => {
    th.addEventListener('click', () => sortTable(i));
  });
  
  

function compute_scores() {
    total_score = 0
    db.collection('users2023').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            total_score = 0
            if (doc.data()['scores']){
                for (let i = 0; i < doc.data()['scores'].length; ++i) {
                    total_score += doc.data()['scores'][i]
                }
                var toUpdate = db.collection('users2023').doc(doc.id)
                toUpdate.update({
                    total:total_score
                })
                .then(() => {
                    console.log("Updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating: ", error);
                });
            }
        })
    })
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function make_rows_clickable() {
  // loop through all the rows and add a click event listener to each row
  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener("click", function() {
      // get the URL you want to navigate to
      page = 'other_player.html'
      let other_player = rows[i].getElementsByTagName('td')[0].innerHTML.trim().split('<')[1].split('(')[1].split(')')[0]
      setCookie('other_player', other_player, 90)
      // navigate to the URL
      if (getCookie('email') == getCookie('other_player')) {
        window.location.href = 'picks.html';
      }
      else {
        window.location.href = page;
      }
      
    });
  }
}

function high_week() {
  db.collection('users2023').get().then((querySnapshot) => {
    let max = 0
    var inner = ''
    let names = []
    let weeks = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let teams = doc.data()['teams']
        let scores = doc.data()['scores']
        if (teams) {
          for (let i = 0; i < teams.length - 1; i += 2) {
            const score1 = scores[i];
            const score2 = scores[i + 1];
            const weekScore = score1 + score2;
            if (weekScore > max) {
              names = []
              weeks = []
              max = weekScore;
              var name = doc.data()['first'] + ' ' + doc.data()['last']
              var week = String(i / 2 + 1)
              names.push(name)
              weeks.push(week)
            }
            else if (weekScore == max) {
              let name = doc.data()['first'] + ' ' + doc.data()['last']
              let week = String(i / 2 + 1)
              names.push(name)
              weeks.push(week)
            }
        }
        if (names.length == 1) {
          inner = "Highest one week scorer: " + name + ' in week ' + week + ' with ' + max + ' points.'
        }
        else {
          console.log(weeks)
          console.log(names)
          inner = "Highest one week scorers: " 
          for (let i = 0; i < names.length; i += 1) {
            inner += names[i] + ' in week ' + weeks[i] + ', ' 
          }
          inner += ' with ' + max + ' points.'
        }
      }
    });
    max_id.innerHTML = inner
});
}