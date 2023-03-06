title = document.querySelector('.page_title');

const bigTeams = [
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

picks = document.getElementById('my-picks')

window.onload = function() {
    var email = getCookie('other_player')
    make_title(email)
    getUser(email, function() {
        makeAccordion();
    });
    

};



function makeAccordion() {
    const accordionHeaders = document.querySelectorAll(".header");
    accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            header.classList.toggle("active");
            const accordionContent = header.nextElementSibling;
            if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;
            } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
        // add this to close all content sections initially
        const accordionContent = header.nextElementSibling;
        accordionContent.style.maxHeight = null;
    });
}

function getUser(email, callback) {
    db.collection('users').where('email', '==', email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                makeHTML(doc.data()['teams'], doc.data()['scores'])

                if (callback) {
                    callback()
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            makeHTML([],[])
        });
}

function makeHTML(teams, scores) {
    if (teams.length === 0) {
        picks.innerHTML = '<h2>No Picks Available</h2>'
    }
    else { 
        for (let i = 0; i < teams.length - 1; i += 2) {
            const team1 = teams[i];
            const logo1 = bigTeams.find(t => t.name === team1)?.logo;
            const score1 = scores[i];
            const team2 = teams[i + 1];
            const logo2 = bigTeams.find(t => t.name === team2)?.logo;
            const score2 = scores[i + 1];
            const weekScore = score1 + score2;
            let inner = "<div class='header'>Week " + String(i / 2 + 1) + "<span class='week-score'>" + " ( " + String(weekScore) + " )</span></div><div class='content'><div class='content-section'><img class='logo' src='" + logo1 + "'><h2>" + team1 + "<span class='week-score'>" + " ( " + String(score1) + " )</span></div><div class='content-section'><img class='logo' src='" + logo2 + "'><h2>" + team2 + "<span class='week-score'>" + " ( " + String(score2) + " )</span></div></div>"    
            picks.innerHTML += inner
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

function make_title(email) {
    db.collection('users').where('email', '==', email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let name = doc.data()['first'] + " " + doc.data()['last']
                title.innerHTML = name +"'s Picks";
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

  }