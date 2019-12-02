  // Material for Football or Data
  const DIVISION_ID = 2014;
  const TOKEN = '342dae01617940a7852d29995fbf39ae';
  var DivisionData;
  var url_division = "https://api.football-data.org/v2/competitions/";
  var url_teams = `${url_division}${DIVISION_ID}/teams`;
  var url_standing = `${url_division}${DIVISION_ID}/standings`;

  // Fetch League URL with Token
  var fetchTOKEN = url => {
    return fetch(url, {
      headers: {
        'X-Auth-Token': TOKEN
      }
    });
  }

  // When calling with Fetch is Success
  function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      
      // reject() Method create block when Catch is called
      return Promise.reject(new Error(response.statusText));

      // Change some object to Promise so that can be use with ".Then" function
    } else {
      return Promise.resolve(response);
    }
  }

  // Parsing JSON to JavaScript Array
  function json(response) {
    return response.json();
  }

  // Handling some Error in Catch Block
  function error(error) {

    // Error from Promise.reject()
    console.log("Error : " + error);
  }

  // Request JSON Data
  function getKompetisi() {
    if ('caches' in window) {
    caches.match(url_standing).then(function (response) {
      if (response) {
        response.json().then(function(data){
          kompetisiHTML(data);
        });
      }
    });
  }

    // Pasrsing to JSON Data
    fetchTOKEN(url_standing)
      .then(status)
      .then(json)
      .then(function(data){
        kompetisiHTML(data)   
      }).catch(error);
    }

  var getDivisions = () => {
  return fetchTOKEN(url_teams)
      .then(status)
      .then(json);
  }

  // Creating Favorite System page and Table Content
  function getFavoriteDivisions() {
    var dataDB= getFavDivisions();
    dataDB.then(function(data){
    var html='';
    data.forEach(function(division){
    html +=`  <div class="collection-item"> 
                <div class="center"><img width="80" height="80" src="${division.crestUrl}"></div></br>
                <div class="center">Name: <b>${division.name}</b></div>
                <div class="center">Website: <a href="${division.website}" target="_blank">${division.website}</a></div></br>
                  <div class="card-action right-align container">
                    <a class="waves-effect waves-light btn-small red z-depth-2" onclick="deleteDivisionListener(${division.id})"><i class="material-icons left">remove</i>Remove</a>
                  </div>
                </div>
              </div>`;
  });

    if(data.length == 0) html += '<h5 class="center-align">You dont have a Favorite Division!</5>'
      document.getElementById("favorite").innerHTML = html;                  
    });
  }

  function kompetisiHTML(data){
    var html = '';
    var content = '';
    var url = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(url);
    content =  `<span class="card-title" align="center" style ="font-weight: bold;">${data.competition.name}  </span>`;
    data.standings[0].table.forEach(function(division){
      html+= `<tr>
                <td>${division.position}</td>
                <td><img class="responsive-img" width="25" height="25" src="${ division.team.crestUrl}">   ${division.team.name}</td>
                <td>${division.playedGames}</td>
                <td>${division.won}</td>
                <td>${division.draw}</td>
                <td>${division.lost}</td>
                <td>${division.goalsFor}</td>
                <td>${division.goalsAgainst}</td>
                <td>${division.goalDifference}</td>
                <td>${division.points}</td>
              </tr>`;
    })

    // Creating ID Content for Pages
    document.getElementById("kompetisi").innerHTML = html;
    document.getElementById("kompetisiCard").innerHTML = content;
  }

  var getAllDivisions = () => {
    var divisions = getDivisions()
    divisions.then(data => {
      var url = JSON.stringify(data).replace(/http:/g, 'https:');
      data = JSON.parse(url);
      divisionData = data;
      var html = ''
      html += ''
      data.teams.forEach(division => {
        html += ` <div class="collection-item"> 
                    <div class="center"><img width="65" height="65" src="${division.crestUrl}"></div>
                    <div class="center">Team Name: <b>${division.name}</b></div>
                    <div class="center">Location: <b>${division.venue}</b></div>
                    <div class="center">Founded: <b>${division.founded}</b></div>
                    <div class="center">Country: <b>${division.area.name}</b></div>
                    <div class="center">Website: <a href="${division.website}" target="_blank">${division.website}</a></div>
                      <div class="card-action right-align">
                        <a class="waves-effect waves-light btn-small blue darken-1" onclick="insertDivisionListener(${division.id})">
                        <i class="material-icons left">favorite</i>Favorite</a>
                      </div>
                    </div>
                  </div>`
      })
      document.getElementById("divisions").innerHTML = html;
    })
  }

  // Save Feature with IndexedDB
  var dbPromise = idb.open('FAQs: Football', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
    }
  });

    // Adding Division
  function insertDivision(division) {
    dbPromise.then(function(db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams')
      store.put(division)
      return tx.complete;
    }).then(function() {
      M.toast({ html: `${division.name} Added to Favorite List` })
      console.log('Division Success to Save');
    }).catch(err => {
      console.error('Division Failed to Save', err);
    });
  }

    // Deleting Division
  function deleteDivision(divisionId) {
    dbPromise.then(function(db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
      store.delete(divisionId);
      return tx.complete;
    }).then(function()  {
      M.toast({ html: "Deleted from Favorite List "})
      if (Notification.permission === 'granted') {
        var NotifDel = "Removed from Favorite List";
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(NotifDel)
        });
    }else  {
        console.error('Notification Feature Not Allowed');
    } getFavoriteDivisions();
      }).catch(err => {
        console.error('Error: ', err);
      });
  }

  // Getting Favorite List
  function getFavDivisions() {
    return dbPromise.then(function(db) {
      var tx = db.transaction('teams', 'readonly');
      var store = tx.objectStore('teams');
      return store.getAll();
    })
  }

  // Add Division to Favorite
  var insertDivisionListener = divisionId => {
    var division = divisionData.teams.filter(el => el.id == divisionId)[0]
    insertDivision(division);
    console.log(divisionId + "Division Added to Favorite List")
  }

  // Remove Division to Favorite
  var deleteDivisionListener = divisionId => {
    var confirmation = confirm("Sure to Delete this Division from Favorite List")
    if (confirmation == true) {
      deleteDivision(divisionId);
      console.log(divisionId + "Division has Been Deleted")
    }
  }