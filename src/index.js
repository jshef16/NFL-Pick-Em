const signupForm = document.querySelector('#signup')
const loginForm = document.querySelector('#login')


// sign up handling
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var first_name = signupForm.first.value;
    var last_name = signupForm.last.value;
    var user = signupForm.email.value;
    var pass = signupForm.password.value;
    var exists = false

    db.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if (doc.data()['email'] == user) {
                alert("An account with that email already exists. Please try again.")
                exists = true
            }
        })
        // if the user is not already in the database
        if (!exists) {
            // Saving the user information to the Firebase Realtime Database
            db.collection("users").add({
                first: first_name,
                last: last_name,
                email: user,
                password: pass
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                alert("Account created with email " + user + ". Please log in.")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    })
})

// log in handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = loginForm.lemail.value;
    var pass = loginForm.lpassword.value;
    var exists = false
    db.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log("Checking " + doc.data()['email'] + " and " + doc.data()['password'] + " against " + user + " and " + pass)
            if (doc.data()['email'] == user) {
                if (doc.data()['password'] == pass) {
                    exists = true;
                    setCookie('name', doc.data()['first'], 1);
                    window.location.href = 'main.html';
                }
            }
        })
    })
})


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  