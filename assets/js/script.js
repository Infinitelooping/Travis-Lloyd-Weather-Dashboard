//globals
var btnEl = document.querySelector("#btn");
var historyContainer = document.querySelector("#history-bar");

var btnid = 0;

//displays the 5-day forecast to the cards.
function displayFiveDay(results) {
    for(var i=1;i<=6;i++) {
        for(var k=1;k<5;k++){
            var forecastedDayCond = document.getElementById("day" + i + "." + k)
            switch (k){
                case 1:
                    forecastedDayCond.textContent = "Date: " + moment().add(i,'days').format("MM/DD/YYYY");
                    break;
                case 2:
                    forecastedDayCond.textContent = "Temp: " + results.daily[i].temp.max;
                    break;
                case 3:
                    forecastedDayCond.textContent = "Wind: " + results.daily[i].wind_speed;
                    break;
                case 4:
                    forecastedDayCond.textContent = "Temp: " + results.daily[i].humidity;
                    break;    
            }
        }
    }
}

//display weather function
function displayWeather(results, cityEl) {
    var tempEl = document.getElementById("temp");
    var windEl = document.getElementById("wind");
    var humidityEl = document.getElementById("humidity");
    var uvEl = document.getElementById("uvi");
    var city = document.getElementById("city-title");

    if(results.current.uvi >= 0 && results.current.uvi < 3) {
        uvEl.style.borderColor = "green"
        uvEl.style.backgroundColor = "green";    
    } else if (results.current.uvi >= 3 && results.current.uvi < 8) {
        console.log("its bad out there");
        uvEl.style.borderColor = "orange";
        uvEl.style.backgroundColor = "orange";
    } else {
        uvEl.style.borderColor = "red";
        uvEl.style.backgroundColor = "red";    
    }

    city.textContent = cityEl + " " + moment().format("MM/DD/YYYY")
    tempEl.textContent = "Temp: " + results.current.temp;
    windEl.textContent = "Wind: " + results.current.wind_speed;
    humidityEl.textContent = "Humidity: " + results.current.humidity;
    uvEl.textContent = results.current.uvi;

    displayFiveDay(results);
}

//history button display
function historyButtons(city) {
    var newButtonEl = document.createElement("BUTTON");
    newButtonEl.textContent = city;
    newButtonEl.classList.add("btn");
    newButtonEl.setAttribute("id", "btnHistory"+btnid);
    newButtonEl.style.margin = "5px auto";
    historyContainer.appendChild(newButtonEl);
    btnid++;
    return;
}
//uses first API to call next API to get weather conditions
function getConditions(lon, lat, cityEl) {

    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=dbe7ee0b24de9fd1a9ce2d793bf721a6&limit=1";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (results) {
                displayWeather(results, cityEl);        
            });
        } else {
            alert("Error: Data not found)");
        }
    })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to weather site");
        });
    }

//listening for when search button is pressed
btnEl.addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("display-section").style.display = "block";
    //grab city from form
    var cityEl = document.querySelector("#input-field").value;
    cityEl = cityEl.charAt(0).toUpperCase() + cityEl.slice(1);
    console.log(cityEl);
    var weatherUrl ="http://api.positionstack.com/v1/forward?access_key=c4bf58a019f128c64c20b6e41582639b&query=" + cityEl + "&limit=1";

    // make a request to the url
    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (results) {
                lon = results.data[0].longitude;
                lat = results.data[0].latitude;
                if (cityEl != null && cityEl != "") {
                    historyButtons(cityEl);    
                }  
                getConditions(lon, lat, cityEl);         
            });
        } else {
            alert("Error: City not found, you may need to enter the name of a city!:)");
        }
    })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to weather site");
        });
})
