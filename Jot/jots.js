window.onload = function () {
    updateJots();
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
        var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        jotZone.innerHTML += '<div id="jot" class="jot card content" style="text-align:left;">' + '<span class="center"><h2 class="dateSans">' + date.toLocaleDateString('en-US', dateOptions) + '</h2><center><button class="editButton" onclick="editJot(jot)">Edit</button> <button class="downloadButton" onclick="download(jot)">Download</button> <button class="deleteButton" onclick="deleteJot(jot)">Delete</button></center></span>' +
            jot + '</div>';
    }

    if (localStorage.length === 0) {
        document.getElementById('newJotButton').style.display = "none";
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
    dates= document.getElementsByClassName("dateSans");
    editButtons = document.getElementsByClassName("editButton")
    deleteButtons = document.getElementsByClassName("deleteButton");
    downloadButtons = document.getElementsByClassName("downloadButton");
    // Loop through all Jots, and hide those who don't match the search query
    for (i = 0; i < jots.length; i++) {
        jot = jots[i];
        date = dates[i];
        deleteButton = deleteButtons[i];
        downloadButton = downloadButtons[i];
        editButton = editButtons[i];
        if (jot.innerHTML.toString().toUpperCase().includes(filter)) {
            jot.style.display = "";
            date.style.display = "";
            deleteButton.style.display = "";
            downloadButton.style.display = "";
            editButton.style.display = "";
            document.getElementById('noResultsFound').style.display = "none";

        } else {
            jot.style.display = "none";
            date.style.display = "none";
            deleteButton.style.display = "none";
            downloadButton.style.display = "none";
            editButton.style.display = "none";
            document.getElementById('noResultsFound').style.display = "";
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

function editJot(jot) {
    location.assign("Jot.html"+"?"+localStorage.key(jot));
  }