const teams = [
  { name: 'Arizona Cardinals', logo: "/img/arizona.png",},
  { name: 'Atlanta Falcons', logo: "/img/atlanta.png",},
  { name: 'Baltimore Ravens', logo: "/img/baltimore.png",},
  { name: 'Buffalo Bills', logo: "/img/buffalo.png",},
  { name: 'Carolina Panthers', logo: "/img/carolina.png",},
  { name: 'Chicago Bears', logo: "/img/chicago.png",},
  { name: 'Cincinnati Bengals', logo: "/img/cincinnati.png",},
  { name: 'Cleveland Browns', logo: "/img/cleveland.png",},
  { name: 'Dallas Cowboys', logo: "/img/dallas.png",},
  { name: 'Denver Broncos', logo: "/img/denver.png",},
  { name: 'Detroit Lions', logo: "/img/detroit.png",},
  { name: 'Green Bay Packers', logo: "/img/greenbay.png",},
  { name: 'Houston Texans', logo: "/img/houston.png",},
  { name: 'Indianapolis Colts', logo: "/img/indianapolis.png",},
  { name: 'Jacksonville Jaguars', logo: "/img/jacksonville.png",},
  { name: 'Kansas City Chiefs', logo: "/img/kansascity.png",},
  { name: 'Las Vegas Raiders', logo: "/img/lasvegas.png",},
  { name: 'Los Angeles Chargers', logo: "/img/losangeles_c.png",},
  { name: 'Los Angeles Rams', logo: "/img/losangeles_r.png",},
  { name: 'Miami Dolphins', logo: "/img/miami.png",},
  { name: 'Minnesota Vikings', logo: "/img/minnesota.png",},
  { name: 'New England Patriots', logo: "/img/newengland.png",},
  { name: 'New Orleans Saints', logo: "/img/neworleans.png",},
  { name: 'New York Giants', logo: "/img/newyork_g.png",},
  { name: 'New York Jets', logo: "/img/newyork_j.png",},
  { name: 'Philadelphia Eagles', logo: "/img/philadelphia.png",},
  { name: 'Pittsburgh Steelers', logo: "/img/pittsburgh.png",},
  { name: 'San Francisco 49ers', logo: "/img/sanfrancisco.png",},
  { name: 'Seattle Seahawks', logo: "/img/seattle.png",},
  { name: 'Tampa Bay Buccaneers', logo: "/img/tampabay.png",},
  { name: 'Tennessee Titans', logo: "/img/tennessee.png",},
  { name: 'Washington Commanders', logo: "/img/washington.png",}
];

let clicked_buttons = []
let num_clicked_buttons = 0;

window.onload = function() {
  title = document.querySelector('.page_title');
  title.innerHTML = "Hi, " + getCookie('name');
  teams.forEach( function(v) { 
    div = document.getElementById("buttons");
    text = "<button id='" + v.name + "' class='button_class' onclick='button_click(this)'><img class='img_class' src='" + v.logo + "' alt=''></button>"
    div.innerHTML = div.innerHTML + text;
  } );

  var docRef = db.collection("users2023").doc(getCookie('userID'));
  docRef.get().then((doc) => {
    if (doc.exists) {
        var selected_teams = doc.data().teams;
        applyOverlay(selected_teams)
        clicked_buttons = doc.data().weekTeams;
        num_clicked_buttons = clicked_buttons.length
        clicked_buttons.forEach(team => {
          selected = document.getElementById(team)
          selected.style = 'border: 2px solid rgb(76, 175, 80); opacity: 1;'
        })
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

  modal('rulesModal', true, 'myBtn')

  modal = document.getElementById('submitModal')
  document.getElementById('submit').addEventListener('click', () => {
    modal.style.display = 'block';
  });
  modal.getElementsByClassName('close')[0].addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

function button_click(button) {
  submit_button = document.getElementsByClassName('submit')
    if (button.style.opacity == 1) {                  /* button is currently clicked, getting unclicked */
      button.style.border = '';
      button.style.opacity = .5
      for (var i = 0; i < num_clicked_buttons; ++i) {
        if (clicked_buttons[i] == button.id){
          clicked_buttons.splice(i, 1)
        }
      }
      num_clicked_buttons--;
    } else {                                         /* button is currently unclicked, getting clicked */
      if (num_clicked_buttons < 2){                  /* making sure no more than 2 buttons are clicked */
        button.style.border =  '2px solid #4CAF50';  
        button.style.opacity = 1
        num_clicked_buttons++;
        clicked_buttons.push(button.id)
      }
    }
    if (num_clicked_buttons == 2){
      submit_button[0].style.display = 'block'
      var myButton = document.getElementById('submit');
      var lockStartDay = 1; // Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      var lockEndDay = 4; // Thursday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      var lockStartTime = 6; // 6 AM (24-hour format)
      var lockEndTime = 19; // 7 PM (24-hour format)
      var currentDate = new Date();
      var currentDay = currentDate.getDay(); // Get the current day (0-6)
      var currentHour = currentDate.getHours(); // Get the current hour (0-23)

      if (
        currentDay >= lockStartDay &&
        currentDay <= lockEndDay &&
        (currentDay !== lockEndDay || currentHour <= lockEndTime) &&
        (currentDay !== lockStartDay || currentHour >= lockStartTime)
      ) {
        myButton.classList.remove('locked');
        myButton.disabled = false;
        myButton.style.fontSize = '30px'
      } else {
        var nextLockDay = lockStartDay;
        var nextLockTime =
          currentDay === lockEndDay ? lockStartTime : lockEndTime;
        var nextLockDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
          nextLockDay
        ];

        if (currentDay === lockEndDay && currentHour > lockEndTime) {
          nextLockDay++;
          nextLockDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
            nextLockDay
          ];
        }

        myButton.textContent = 'Locked: Opens on Monday';
        myButton.style.fontSize = '20px'
        myButton.style.fontWeight = '300'
      }
    }
    else {
      submit_button[0].style.display = 'none'
    }
}

function applyOverlay(selected_teams) {
  const buttons = document.getElementsByClassName("button_class");
  const occurrences = {};

  // Count the occurrences of each team in the selected_teams list
  for (const team of selected_teams) {
    occurrences[team] = (occurrences[team] || 0) + 1;
  }

  let doubles = []

  for (const team in occurrences) {
    if (occurrences[team] == 2) {
      doubles.push(team)
    }
  }

  for (const button of buttons) {
    const buttonId = button.id;
    if (occurrences[buttonId] === 1) {
      button.style.backgroundColor = "yellow";
      if (doubles.length > 3) {
        button.onclick = function () {
          modal('errorModal', false, 'na')
          return false;
        };
      }
    } else if (occurrences[buttonId] === 2) {
      button.style.backgroundColor = "red";
      button.onclick = function () {
        return false;
      };
    }
  }
}

function submit() {
  button = document.getElementById('submitModal')
  userRef = db.collection('users2023').doc(getCookie('userID'))
  console.log(clicked_buttons)
  return userRef.update({
    weekTeams: [clicked_buttons[0], clicked_buttons[1]]
  })
  .then(() => {
      console.log("Document successfully updated!");
      //alert('Your team selection has been successfully submitted!')
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
}

function modal(name, button, buttonID) {
  // Get the modal
  var modal = document.getElementById(name);

  // Get the button that opens the modal
  var btn = document.getElementById(buttonID);

  // Get the <span> element that closes the modal
  var span = modal.getElementsByClassName("close")[0];

  if (button) {
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }
  }
  else {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
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
