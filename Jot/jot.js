window.onload = function () {
  url = window.location.href;
  if(url.indexOf("?") > -1) {
    var selectedJot = url.split('?')[1];
    document.getElementById("content").innerHTML = localStorage.getItem(selectedJot);
  }
};

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
  var content = jot.innerHTML,
  dl = document.createElement('a'),
  promptInput = prompt("What is the name of your Jot?"),
  filename;
  if(promptInput !== null) {
    promptInput === "" ? filename = "Untitled" + ".html" : filename = promptInput + ".html";
    dl.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
    dl.setAttribute('download', filename);
    dl.setAttribute('visibility', 'hidden');
    dl.setAttribute('display', 'none');
    document.body.appendChild(dl);
    dl.click();
  }
}

function save() {
  url = window.location.href;
  if(url.indexOf("?") > -1) {
    var existingJot = url.split('?')[1];
    localStorage.removeItem(existingJot);
  }
  var date = Date.now().toString();
  var content = document.getElementById("content").innerHTML;
  localStorage.setItem(date, content);
  var savedSnackbar = document.getElementById("savedSnackbar");
  savedSnackbar.className = "show";
  setTimeout(function(){ savedSnackbar.className = savedSnackbar.className.replace("show", ""); }, 3000);
  updateJots();
}

function wordCount() {
  var content = document.getElementById("content").innerHTML;
  content = content.replace(/(^\s*)|(\s*$)/gi,"");
  content = content.replace(/[ ]{2,}/gi," ");
  content = content.replace(/\n /,"\n");
  var wordCount = "Word Count: " + content.split(' ').length;
  var wordCountSnackbar = document.getElementById("wordCountSnackbar");
  wordCountSnackbar.innerText = wordCount;
  wordCountSnackbar.className = "show";
  setTimeout(function(){ wordCountSnackbar.className = wordCountSnackbar.className.replace("show", ""); }, 3000);
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

  if (e.ctrlKey && e.key === "/" || e.metaKey && e.key === "/") {
    e.preventDefault();
    wordCount();
  }
}

document.addEventListener('keydown', keyHandler);