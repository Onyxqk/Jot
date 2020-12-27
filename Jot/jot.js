window.onload = function () {
  getTheme();
};

var id=0;

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

function center() {
  const selection = window.getSelection();
  const center = document.getElementById('center');
  const centered = selection.containsNode(center);

  if(centered) {
    center.range.deleteContents();
  }
  else {
    var centerElement = document.createElement("center");
    centerElement.id = "center";
    var t = document.createTextNode(window.getSelection());
    centerElement.appendChild(t);
    var sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(centerElement);
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      range.text = centerElement;
    }
  }
}

function italicize() {
  document.execCommand("italic");
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

function save() {
  var date = Date.now();
  var content = document.getElementById("content").innerHTML;
  localStorage.setItem(date, content);
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
  if (e.ctrlKey && e.key === "s" || e.metaKey && e.key === "s") {
    e.preventDefault();
    save();
  }
  if (e.ctrlKey && e.key === "d" || e.metaKey && e.key === "d") {
    e.preventDefault();
    download();
  }
}

document.addEventListener('keydown', keyHandler);

function getTheme() {
  switch (localStorage.getItem("theme")) {
      case "crimsonTide":
          document.getElementById('topnav').classList.add('crimsonTide');
          document.getElementById('buttonGroup').classList.add('crimsonTide2');
          document.querySelector('.separator').classList.add('crimsonTide');
          document.querySelectorAll('button').forEach(button => {
            button.classList.add('crimsonTide');
          });
          break;
      case "batcave":
        document.getElementById('topnav').classList.add('batcave');
        document.getElementById('body').classList.add('batcave-backdrop');
        break;
      case "regal":
          document.getElementById('topnav').classList.add('regal');
          document.getElementById('body').classList.add('regal-backdrop');
          document.querySelector('.separator').classList.add('regal');
          document.querySelectorAll('.btn-group button').forEach(button => {
            button.classList.add('regal');
          });
          break;
      case "lux":
        document.getElementById('topnav').classList.add('lux');
        // document.getElementById('buttonGroup').classList.add('lux2');
        document.getElementById('search').classList.add('lux2');
        document.getElementById('body').classList.add('regal-backdrop');
        break;
      default:
          break;
  }
}

function setTheme() {
  var selectedTheme = document.getElementById('themes').options[themes.selectedIndex].value;
  switch (selectedTheme) {
      case "crimsonTide":
          localStorage.setItem("theme", "crimsonTide");
          location.reload();
          break;
      case "batcave":
        localStorage.setItem("theme", "batcave");
        location.reload();
          break;
      case "regal":
        localStorage.setItem("theme", "regal");
        location.reload();
        break;
      case "lux":
        localStorage.setItem("theme", "lux");
        location.reload();
        break;
      default:
        localStorage.removeItem(localStorage.key("theme"));
        location.reload();
        break;
  }
}