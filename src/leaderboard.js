table = document.querySelector('.leaders')

window.onload = function() {
    table.innerHTML = "<tr><th>Name</th><th>Score</th></tr>"
    db.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data()['first'] + " " + doc.data()['last'])
            text = "<tr><td>" + doc.data()['first'] + " " + doc.data()['last'] + "</td><td>0</td></tr>"
            table.innerHTML = table.innerHTML + text;
        })
    })
}


