var displayMoon = document.querySelector("#moon-phase");
var displayStars = document.querySelector("#star-chart");
var displayNames = document.querySelector("#planets");
var btnEl=document.getElementById('button')
var dateEL=document.getElementById('')
btnEl.addEventListener('click',(e)=>{
  e.preventDefault()
  console.log("test")
})
// based on the given app id and app Secret we generate a hash for authorization
//refere to https://docs.astronomyapi.com/#sample-curl-request
var applicationId = "530a1429-db0d-4587-adb1-ded19a7d404d";
var applicationSecret =
  "b61037a5c464044d27334b3dd0f410339546c8ff10ab50eebcce8b488b5439217224c87383070db4a719e49e54f3788da3c23a76362f4e57458eb7155538ab58154b897ef27bffefd7aa5f592237c3f43327b5a8b4c82efca177e8a995816f78c8da59077974d86e840c98de251e9c07";
var baseurlPositions =
  "https://api.astronomyapi.com/api/v2/bodies/positions?longitude=122.4194&latitude=37.7749&elevation=1&from_date=2023-02-03&to_date=2023-02-03&time=05%3A51%3A49";
// here in baseurl we are looking Planetary Positions endpoint and  Longitude,Latitude,From Date,To Date,and Time are hardcoded we have to find a way a user to enter or get their location
//the other end points are Star Charts,Moon Phase.search
const hash = btoa(`${applicationId}:${applicationSecret}`);
//example one using Planetary Positions endpoint

fetch(baseurlPositions, {
  headers: {
    Authorization: `Basic ${hash}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    var PlanetNames = data.data.table.rows;
    for (let elem of PlanetNames) {
      var listEL = document.createElement("li");
      listEL.textContent = elem.entry.name;
      displayNames.appendChild(listEL);
      console.log(elem.entry.name);
    }

    console.log(PlanetNames);
  });

//example tow getting moon image  from moon-phase endpoint and  style ,obserever,view query parameters are given as object
const baseUrlmoonPhase =
  "https://api.astronomyapi.com/api/v2/studio/moon-phase";
let mydata = {
  style: {
    moonStyle: "default",
    backgroundStyle: "stars",
    backgroundColor: "#000000",
    headingColor: "#ffffff",
    textColor: "#ffffff",
  },
  observer: { latitude: 37.7749, longitude: -84.39733, date: "2023-02-04" },
  view: { type: "landscape-simple" },
};

fetch(baseUrlmoonPhase, {
  method: "POST",
  body: JSON.stringify(mydata),

  headers: {
    Authorization: `Basic ${hash}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    var imageSrc = data.data.imageUrl;
    var imgHolder = document.createElement("img");
    imgHolder.setAttribute("src", imageSrc);
    displayMoon.appendChild(imgHolder);
  });
//example theree getting moon image  from star-chart endpoint and  style ,obserever,view query parameters are given as object
const baseUrlStarChart =
  "https://api.astronomyapi.com/api/v2/studio/star-chart";
let mydatatwo = {
  style: "inverted",
  observer: { latitude: 31.9523, longitude: 115.8613, date: "2023-02-06" },
  view: { type: "constellation", parameters: { constellation: "ori" } },
};
fetch(baseUrlStarChart, {
  method: "POST",
  body: JSON.stringify(mydatatwo),

  headers: {
    Authorization: `Basic ${hash}`,
  },
})
  .then((response) => response.json())
  .then((data) => {

    var imageSrc = data.data.imageUrl;
    var imgHolder = document.createElement("img");
    imgHolder.setAttribute("src", imageSrc);
    displayStars.appendChild(imgHolder);
  });
//exmaple four using serach ende pont term and match type are hard coded
let basUrlSearch = "https://api.astronomyapi.com/api/v2/search?term=polaris&ra=&dec=&match_type=fuzzy";

  fetch(basUrlSearch, {
    headers: {
      Authorization: `Basic ${hash}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
     console.log(data)
    })
