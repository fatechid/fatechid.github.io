document.addEventListener("DOMContentLoaded", function() {

  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Load Link is on Meny
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Event Listener Register for Every Link on Menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {

              // Clode Sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Load Content Page Which is Called
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  loadPage(setup(page));
  function setup(page) {
      if (page == "" || page == "#" ) {
          page = "home";
      } else if (page == "division") {
          page = "division";
       } else if (page == "favorite") {
          page = "favorite";
      }
      return page;
  }

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

      // Calling Content for HTML Page   
      if (this.readyState == 4) {
        var content = document.querySelector(".body-content");
        if (page === "home") {
          getKompetisi();
      } else if (page === "division") {
          getAllDivisions();
       } else if (page === "favorite") {
          getFavoriteDivisions();
      }
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Page not Found!</p>";
        } else {
          content.innerHTML = "<p>Ops.. Page Can't be Access</p>";
        }
      }
    };
    xhttp.open("GET", "sites/" + page + ".html", true);
    xhttp.send();
  }

});
