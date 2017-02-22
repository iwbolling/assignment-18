import $ from "jquery";

// VARIABLES - DOM ELEMENT SELECTIONS
var divHeader = document.querySelector(".header");
var divNavbar = document.querySelector(".navbar");
var divAllNavbarItems = document.querySelectorAll(".navbar_nav-item");
var divRouteContainer = document.querySelector(".route-container");
// NOTE: the following specific tab variables may not need to be used
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

// FUNCTIONS - PAGE CONTENT ROUTER
function pageContentRouter(){
  if (window.location.hash === "#home"){
    pageContentHome();
  } else if (window.location.hash === "#concerts"){
    pageContentConcerts();
  } else if (window.location.hash === "#carpools"){
    pageContentCarpools();
  };
}
pageContentRouter();
window.addEventListener("hashchange",pageContentRouter);
