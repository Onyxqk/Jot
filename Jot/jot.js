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

function bold() {
  document.execCommand("bold");
}

function h1() {
  var h1 = document.createElement("H1"); // Create the H1 element
  h1.id = "H1";
  var t = document.createTextNode(window.getSelection()); // Create a text element
  h1.appendChild(t); // Append the text node to the H1 element 
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(h1);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = h1;
    }
}

function h2() {
  var h2 = document.createElement("H2");
  h2.id = "H2";
  var t = document.createTextNode(window.getSelection());
  h2.appendChild(t);
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(h2);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = h2;
    }
}

function blockquote() {
  var blockquote = document.createElement("blockquote");
  blockquote.id = "blockquote";
  var t = document.createTextNode(window.getSelection()); 
  blockquote.appendChild(t);  
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(blockquote);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = blockquote;
    }
}


function italicize() {
  document.execCommand("italic");
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

function download() {
  var content = document.getElementById("content").innerHTML;
  var dl = document.createElement('a');
  var filename = document.getElementsByTagName("H1").item(0).innerHTML + '.html';
  dl.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
  dl.setAttribute('download', filename);
  // Set hidden so the element doesn't disrupt your page
  dl.setAttribute('visibility', 'hidden');
  dl.setAttribute('display', 'none');
  // Append to page
  document.body.appendChild(dl);
  // Now you can trigger the click
  dl.click();
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