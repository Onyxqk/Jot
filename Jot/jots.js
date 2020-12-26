window.onload = function () {
    updateJots();
};
  
function updateJots() {
    var jotZone = document.getElementById('jotZone');

    for (var i = 0; i < localStorage.length; i++) {
        var timestamp = parseInt(localStorage.key(i));
        var date = new Date(timestamp);
        jotZone.innerHTML += '<h2>' + date.toDateString() + '</h2>' + '<div id="card" class="card content" style="text-align:left;">' +
            localStorage.getItem(localStorage.key(i)); + '</div>';
    }

    if(localStorage.length===0) {
        jotZone.innerHTML += '<h2>' + 'There are no jots here' + '</h2>';
        document.getElementById('deleteAllButton').style.display="none";
    }
}

function search() {
    var input, filter, jotZone, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    jots = document.getElementsByClassName("card");
    // Loop through all Jots, and hide those who don't match the search query
    for (i = 0; i < jots.length; i++) {
        jot = jots[i];
        if (jot.innerHTML.toString().toUpperCase().includes(filter)) {
            jot.style.display = "";
        } else {
            jot.style.display = "none";
        }

    }
}

function deleteAll() {
    localStorage.clear();
    location.reload(); 
}

function deleteJot(jot) {
    localStorage.removeItem(localStorage.key(jot));
}