function currentPath() {

  let path = localStorage.getItem('path');

  if (path === "0") {document.getElementById("current-path").textContent = "Chronological";}
  else if (path === "1") {document.getElementById("current-path").textContent = "Not Just Clothing";}
  else if (path === "2") {document.getElementById("current-path").textContent = "Red Carpet";}
}

currentPath();