window.onload = function () {
  getTheme();
  url = window.location.href;
  if(url.indexOf("?") > -1) {
    selectedJot = Date.parse((url.split('?')[1]));
    document.getElementById("content").innerHTML = localStorage.getItem(localStorage.key(selectedJot));
  }
};

var id=0;

function bold() {
  document.execCommand("bold");
}

function h1() {
  document.execCommand("formatBlock", false, "<h1>"); 
}

function h2() {
  document.execCommand("formatBlock", false, "<h2>"); 
}

function paragraphify() {
  document.execCommand("formatBlock", false, "<p>");
}

function blockquote() {
  document.execCommand("formatBlock", false, "<blockquote>"); 
}

function bullet() {
  document.execCommand("insertUnorderedList");
}

function numlist() {
  document.execCommand("insertOrderedList");
}

function italicize() {
  document.execCommand("italic");
}

function textAlign() {
  var rangeValue = document.getElementById("alignRange").value;
  switch(rangeValue) {
    case "1":
      document.execCommand("justifyLeft");
      break;
    case "2":
      document.execCommand("justifyCenter");
      break;
    case "3":
      document.execCommand("justifyRight");
      break;  
  }
}

function download(jot) {
  var content = jot.innerHTML;
  var dl = document.createElement('a');
  var filename = jot.getElementsByTagName("H1").item(0).innerHTML + '.html';
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
  updateJots();
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
