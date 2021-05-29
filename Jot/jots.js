var readMoreExpand;

window.onload = function () {
    readMoreExpand = false;
    updateJots();
    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then(function (persistent) {
            if (persistent) {
                console.log("Storage will not be cleared except by explicit user action");
            }
            else {
                console.log("Storage may be cleared by the UA under storage pressure.");
            }
        });
    }
};

function updateJots() {
    var jotZone, i;
    jotZone = document.getElementById('jotZone')
    for (i = 0; i < localStorage.length; i++) {
        var timestamp = parseInt(localStorage.key(i)),
        date = new Date(timestamp),
        jot = localStorage.getItem(localStorage.key(i)),
        dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
        dateComponent = '<h2 class="dateSans">' + date.toLocaleDateString('en-US', dateOptions) + '</h2>',
        editButtonComponent = '<button class="editButton" id='+i+' onclick="editJot(this.id)">Edit</button> ',
        downloadButtonComponent = '<button class="downloadButton" id='+i+' onclick="download(jot)">Download</button> ',
        deleteButtonComponent = '<button class="deleteButton" id='+i+' onclick="deleteJot(this.id)">Delete</button> ',
        readMoreButtonComponent = '<br><br><button id='+i+' class="readMoreButton" onclick="toggleExpand(this.id)">Read More</button>';
        if(jot.length <= 280) {
            jotZone.innerHTML += '<div id="jot" class="jot card content" style="text-align:left;">' + '<span class="center">' + dateComponent + '<center>' 
            + editButtonComponent + downloadButtonComponent + deleteButtonComponent + '</center></span>' + jot + '</div>';
        }
        if(jot.length > 280) {
            jotZone.innerHTML += '<div id="jot" class="jot card content" style="text-align:left;">' + '<span class="center">' + dateComponent + '<center>' 
            + editButtonComponent + downloadButtonComponent + deleteButtonComponent + '</center></span>' + readMore(jot, readMoreExpand) 
            + readMoreButtonComponent + '</div>';
        }
    }

    // if (localStorage.length === 0) {
    //     document.getElementById('newJotButton').style.display = "none";
    // }
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

function loadJot() {
    location.assign("Jot.html");
}

function editJot(id) {
    console.log(id);
    var jot = localStorage.getItem(localStorage.key(id));
    console.log(jot);
    location.assign("Jot.html"+"?"+localStorage.key(id));
}

function deleteJot(id) {
    console.log(id);
    localStorage.removeItem(localStorage.key(id));
    location.reload();
}

function readMore(jot, readMoreExpand) {
    if(!readMoreExpand) {
        jotPreview = jot.slice(0,280);
        return jotPreview;
    }
    else {
        return jot;
    }
}

function toggleExpand(i) {
    var editButtonComponent = '<button class="editButton" id='+i+' onclick="editJot(this.id)">Edit</button> ',
    downloadButtonComponent = '<button class="downloadButton" id='+i+' onclick="download(jot)">Download</button> ',
    deleteButtonComponent = '<button class="deleteButton" id='+i+' onclick="deleteJot(this.id)">Delete</button> ',
    readMoreButtonComponent = '<br><br><button id='+i+' class="readMoreButton" onclick="toggleExpand(this.id)">Read More</button>',
    readLessButtonComponent = '<button id='+i+' class="readMoreButton" onclick="toggleExpand(this.id)">Read Less</button>',
    timestamp = parseInt(localStorage.key(i)),
    date = new Date(timestamp),
    dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
    dateComponent = '<h2 class="dateSans">' + date.toLocaleDateString('en-US', dateOptions) + '</h2>',
    jot = localStorage.getItem(localStorage.key(i)),
    jots = document.getElementsByClassName("card");

    readMoreExpand = !readMoreExpand;

    if(readMoreExpand) {
        jots[i].innerHTML = '<center>' + dateComponent + editButtonComponent + downloadButtonComponent + deleteButtonComponent + '</center>' +
        readMore(jot, readMoreExpand) + readLessButtonComponent + '</div>';
    }
    if(!readMoreExpand) {
        jots[i].innerHTML = '<center>' + dateComponent + editButtonComponent + downloadButtonComponent + deleteButtonComponent + '</center>' +
        readMore(jot, readMoreExpand) + readMoreButtonComponent + '</div>';
    }
}