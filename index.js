const form = document.querySelector('#signup')

function signUp() {
    // Get the user's input
    var first_name = document.getElementById("first").value;
    var last_name = document.getElementById("last").value;
    var user = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    // Saving the user information to the Firebase Realtime Database
    db.collection("users").add({
        first: first_name,
        last: last_name,
        email: user,
        password: pass
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
