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

window.onload = function() {
  title = document.querySelector('.page_title');
  title.innerHTML = "Hi, " + getCookie('name');
  teams.forEach( function(v) { 
    div = document.getElementById("buttons");
    text = "<button id='" + v.name + "' class='button_class' onclick='button_click(this)'><img class='img_class' src='" + v.logo + "' alt=''></button>"
    div.innerHTML = div.innerHTML + text;
  } );
}

let num_clicked_buttons = 0;
let clicked_buttons = []

function button_click(button) {
  submit_button = document.getElementsByClassName('submit')
    if (button.style.opacity == 1) {                  /* button is currently clicked, getting unclicked */
      button.style.border = '';
      button.style.opacity = .5
      for (var i = 0; i < num_clicked_buttons; ++i) {
        if (clicked_buttons[i] == button){
          clicked_buttons.splice(i, 1)
        }
      }
      num_clicked_buttons--;
      console.log(clicked_buttons)
    } else {                                         /* button is currently unclicked, getting clicked */
      if (num_clicked_buttons < 2){                  /* making sure no more than 2 buttons are clicked */
        button.style.border =  '2px solid #4CAF50';  
        button.style.opacity = 1
        num_clicked_buttons++;
        clicked_buttons.push(button)
        console.log(clicked_buttons)
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

        myButton.textContent = 'Locked: Opens on Monday at 6am';
        myButton.style.fontSize = '20px'
      }
    }
    else {
      submit_button[0].style.display = 'none'
    }
}


function submit() {
  userRef = db.collection('users').doc(getCookie('userID'))
  return userRef.update({
    weekTeams: [clicked_buttons[0].id, clicked_buttons[1].id]
  })
  .then(() => {
      console.log("Document successfully updated!");
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
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
