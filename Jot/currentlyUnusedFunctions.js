var editableState = false;
var navbarExpanded = true;
var contentItems = document.getElementsByClassName("contentItem");

function toggleEditable() {
    editableState = !editableState;
    var i;
    for (i = 0; i < contentItems.length; i++) {
        contentItems[i].contentEditable = editableState;
    }
    if (editableState) {
        document.getElementById("editButton").textContent = "Done editing";
        document.getElementById("buttonGroup").classList.remove("hideContent");
    }
    else {
        document.getElementById("editButton").textContent = "Edit";
        document.getElementById("buttonGroup").classList.add("hideContent");
    }
}

function toggleNav() {
    if (navbarExpanded) {
        document.getElementById("caret").classList.add("rotate");
        document.getElementById("topnav").classList.add("topshift");
        document.getElementById("card").classList.add("topshift");
    }
    else {
        document.getElementById("caret").classList.remove("rotate");
        document.getElementById("topnav").classList.remove("topshift");
        document.getElementById("card").classList.remove("topshift");
    }
    navbarExpanded = !navbarExpanded;
}