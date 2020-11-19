var editableState = false;
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

function bold() {
  document.execCommand("bold");
}


function italicize() {
  document.execCommand("italic");
}

function keyHandler(e) {
  if (e.ctrlKey && e.key === "b" || e.metaKey && e.key === "b") {
    e.preventDefault();
    bold();
  }
  if (e.ctrlKey && e.key === "i" || e.metaKey && e.key === "i") {
    e.preventDefault();
    italicize();
  }
}

document.addEventListener('keydown', keyHandler);