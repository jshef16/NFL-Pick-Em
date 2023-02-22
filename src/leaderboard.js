table = document.getElementById('leaders')

window.onload = async function() {
    compute_scores()
    table.innerHTML = await create_table()
    sortTable(1)
    
}

async function create_table() {
    var inner = "<thead><tr><th>Name</th><th>Score</th></tr></thead><tbody>";
    
    const snapshot = await db.collection('users').get();
    snapshot.docs.forEach(doc => {
      console.log(doc.data()['first'] + " " + doc.data()['last'])
      const add_text = "<tr><td style='text-align: left;'>" + doc.data()['first'] + " " + doc.data()['last'] + "<span style='color:grey; text-align: right; float:right;'> (" + doc.data()['email'] + ") </span> </td><td>" + doc.data()['total'] + "</td></tr>"
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
    db.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            total_score = 0
            if (doc.data()['scores']){
                for (let i = 0; i < doc.data()['scores'].length; ++i) {
                    total_score += doc.data()['scores'][i]
                }
                var toUpdate = db.collection('users').doc(doc.id)
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

