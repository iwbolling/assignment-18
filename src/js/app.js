import $ from "jquery";

// VARIABLES - DOM ELEMENT SELECTIONS
var divHeader = document.querySelector(".header");
var divNavbar = document.querySelector(".navbar");
var divAllNavbarItems = document.querySelectorAll(".pagenav_nav-item");
var divRouteContainer = document.querySelector(".route-container");
var divHomeTab = document.querySelector(".home-tab");
var divConcertTab = document.querySelector(".concert-tab");
var divCarpoolTab = document.querySelector(".carpool-tab");
var divFlightTab = document.querySelector(".flight-tab");

// FUNCTIONS - PAGE CONTENT GENERATION
function pageContentHome(){
  divRouteContainer.innerHTML = `<div class="home-page">
                                  <div class="home-page_content">
                                    <h2>The Basic Facts</h2>
                                    <table class="facts-table">
                                      <tr>
                                        <td>Native Name</td>
                                        <td>Ísland</td>
                                      </tr>
                                      <tr>
                                        <td>Demonym</td>
                                        <td>Icelander</td>
                                      </tr>
                                      <tr>
                                        <td>Area</td>
                                        <td>102,775 km²</td>
                                      </tr>
                                      <tr>
                                        <td>Country Code</td>
                                        <td>+354</td>
                                      </tr>
                                    </table>
                                  </div>
                                </div>`
};
function pageContentConcerts(){
  $.getJSON("http://apis.is/concerts").then(function(serverRes){
    let concertRes = serverRes.results;
    var genConcerts = concertRes.map(function(concertObj){
      return `<div class="concert-pane col-sm-12 col-md-6 col-lg-4">
                <div class="concert-pane_thumb thumbnail">
                  <img src="${concertObj.imageSource}">
                  <div class="caption">
                    <h3>${concertObj.eventDateName}</h3>
                    <h4><span>Venue:</span> <strong>${concertObj.eventHallName}</strong></h4>
                    <p>${concertObj.dateOfShow}</p>
                  </div>
                </div>
              </div>`
    }).join("");
    divRouteContainer.innerHTML = `<div class="concerts-page">
                                    <div class="concerts-page_content">
                                    <h2>Concerts</h2>
                                      <div class="all-concerts row">
                                        ${genConcerts}
                                      </div>
                                    </div>
                                  </div>`
  });
};
function pageContentCarpools(){
  $.getJSON("http://apis.is/rides/samferda-drivers/").then(function(serverRes){
    let carpoolRes = serverRes.results;
    var genCarpools = carpoolRes.map(function(carpoolObj){
      return `<tr>
                <td>${carpoolObj.time}, ${carpoolObj.date}</td>
                <td>${carpoolObj.from}</td>
                <td>${carpoolObj.to}</td>
              </tr>`
    }).join("");
    divRouteContainer.innerHTML = `<div class="carpools-page">
                                    <div class="carpools-page_content">
                                      <h2>Carpools</h2>
                                      <table class="carpools-table">
                                        <tr>
                                          <th>Time of Departure</th>
                                          <th>From</th>
                                          <th>To</th>
                                        </tr>
                                        ${genCarpools}
                                      </table>
                                    </div>
                                  </div>`
  });
};
function pageContentFlights(){
  divRouteContainer.innerHTML = `<div class="flights-page">
                                  <div class="flights-page_content row">
                                    <h2>Flights</h2>
                                    <div class="col-sm-12 col-md-6">
                                      <h3>Arrivals</h3>
                                      <table class="table-arrivals">
                                      </table>
                                    </div>
                                    <div class="col-sm-23 col-md-6">
                                      <h3>Departures</h3>
                                      <table class="table-departures">
                                      </table>
                                    </div>
                                  </div>
                                 </div>`;
  var tableArrivals = document.querySelector(".table-arrivals");
  var tableDepartures = document.querySelector(".table-departures");
  $.getJSON("http://apis.is/flight?language=en&type=arrivals").then(function(serverRes){
    let flightRes = serverRes.results;
    var genFlights = flightRes.map(function(flightObj){
      return `<tr>
                <td>${flightObj.date}</td>
                <td>${flightObj.plannedArrival}</td>
                <td>${flightObj.from}</td>
                <td>${flightObj.airline}</td>
              </tr>`;
    }).join("");
    tableArrivals.innerHTML = `<tr>
                                <th>Date</th>
                                <th>Arrival Time</th>
                                <th>Origin</th>
                                <th>Airline</th>
                              </tr>
                              ${genFlights}`
  });
  $.getJSON("http://apis.is/flight?language=en&type=departures").then(function(serverRes){
    let flightRes = serverRes.results;
    var genFlights = flightRes.map(function(flightObj){
      return `<tr>
                <td>${flightObj.date}</td>
                <td>${flightObj.plannedArrival}</td>
                <td>${flightObj.to}</td>
                <td>${flightObj.airline}</td>
              <tr>`;
    }).join("");
    tableDepartures.innerHTML = `<tr>
                                  <th>Date</th>
                                  <th>Departure Time</th>
                                  <th>Origin</th>
                                  <th>Airline</th>
                                </tr>
                                ${genFlights}`
  });
};

// FUNCTIONS - PAGE CONTENT ROUTER
function pageContentRouter(){
  if (window.location.hash === "#concerts"){
    pageContentConcerts();
  } else if (window.location.hash === "#carpools"){
    pageContentCarpools();
  } else if (window.location.hash === "#flights"){
    pageContentFlights();
  } else {
    window.location.hash = "#home";
    pageContentHome();
  };
}
pageContentRouter();

// EVENT LISTENERS
window.addEventListener("hashchange",pageContentRouter);
// divAllNavbarItems.addEventListener("click");
for (var i=0;i<divAllNavbarItems.length;i++){
  let currentNavbarItem = divAllNavbarItems[i];
  currentNavbarItem.addEventListener("click", function(evt){
    var clickedItem = evt.currentTarget;
    var arrayOfClasses = [...clickedItem.classList];
    clearAllNavbarItems();
    clickedItem.classList.add("selected");
    if (arrayOfClasses.indexOf("concert-tab") !== -1){
      window.location.hash = "#concerts";
    } else if (arrayOfClasses.indexOf("carpool-tab") !== -1){
      window.location.hash = "#carpools";
    } else if (arrayOfClasses.indexOf("flight-tab") !== -1){
      window.location.hash = "#flights";
    } else if (arrayOfClasses.indexOf("home-tab") !== -1){
      window.location.hash = "#home";
    } else{
    }
  })
}
function clearAllNavbarItems(){
  for (let i=0;i<divAllNavbarItems.length;i++){
    divAllNavbarItems[i].classList.remove("selected");
  }
}
