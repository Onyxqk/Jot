window.onload = function () {
    updateJots();
    getTheme();
    if (navigator.storage && navigator.storage.persist)
        navigator.storage.persist().then(function (persistent) {
            if (persistent)
                console.log("Storage will not be cleared except by explicit user action");
            else
                console.log("Storage may be cleared by the UA under storage pressure.");
        });
};

function updateJots() {
    var jotZone = document.getElementById('jotZone');
    for (var i = 0; i < localStorage.length; i++) {
        var timestamp = parseInt(localStorage.key(i));
        var date = new Date(timestamp);
        var jot = localStorage.getItem(localStorage.key(i));
        jotZone.innerHTML += '<h2 class="sans">' + date.toDateString() + '</h2>' + '<button class="deleteButton" onclick="deleteJot(jot)">Delete Jot</button>' + '<div id="jot" class="jot card content" onclick="loadJot()" style="text-align:left;">' +
            jot + '</div>';
    }

    if (localStorage.length === 0) {
        document.getElementById('deleteAllButton').style.display = "none";
    }
    if (localStorage.length > 0) {
        document.getElementById('noJotsZone').style.display = "none";
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
    location.reload();
}

function loadJot() {
    location.assign("Jot.html");
}
