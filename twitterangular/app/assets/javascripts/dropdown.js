function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function addDropDownItem(id,items){
  var dropdownmenu = id
  console.log(items)
  for(item in items)
  {
    var dropdownitem = document.createElement('a')
    var dropdownitemtext = document.createTextNode(items[item]["text"])
    dropdownitem.appendChild(dropdownitemtext)
    dropdownitem.setAttribute("href",items[item]["location"]);
    dropdownmenu.appendChild(dropdownitem);
  }
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
