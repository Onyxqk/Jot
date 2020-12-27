window.onload = function () {
    updateJots();
    getTheme();
};
  
function updateJots() {
    var jotZone = document.getElementById('jotZone');

    for (var i = 0; i < localStorage.length; i++) {
        var timestamp = parseInt(localStorage.key(i));
        var date = new Date(timestamp);
        var jot = localStorage.getItem(localStorage.key(i));
        jotZone.innerHTML += '<h2 class="sans">' + date.toDateString() + '</h2>' + '<div id="jot" class="jot card content" style="text-align:left;">' +
            jot + '</div>';
    }

    if(localStorage.length===0) {
        jotZone.innerHTML += '<h2 class="sans">' + 'There are no jots here' + '</h2>';
        jotZone.innerHTML += '<button class="createButton" onclick="loadJot()">Create a jot</button>'
        document.getElementById('deleteAllButton').style.display="none";
    }
}

function search() {
    var input, filter, jot, i;
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

function loadJot() {
    location.assign("Jot.html");
}
