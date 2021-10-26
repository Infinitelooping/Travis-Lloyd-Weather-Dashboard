//globals
var btnEl = document.querySelector("#btn");
var historyContainer = document.querySelector("#history-bar");
var forecastedDayCond = "";

//displays the 5-day forecast to the cards.
function displayFiveDay(results) {
    for(var i=1;i<6;i++) {
        for(var k=1;k<6;k++){
            forecastedDayCond = document.getElementById("day" + i + "." + k)
            console.log(i,k);
            switch (k){
                case 1:
                    //console.log(forecastedDayCond);
                    forecastedDayCond.textContent = "Date: " + moment().add(i,'days').format("MM/DD/YYYY");
                    break;
                case 2:
                    forecastedDayCond.textContent = "Temp: " + results.daily[i].temp.max + " F";
                    break;
                case 3:
                    forecastedDayCond.textContent = "Wind: " + results.daily[i].wind_speed + " MPH";
                    break;
                case 4:
                    forecastedDayCond.textContent = "Temp: " + results.daily[i].humidity + "%";
                    break;
                case 5:
                    forecastedDayCond.setAttribute("background-image", "results.daily["+i+"].weather.icon");
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
    tempEl.textContent = "Temp: " + results.current.temp + " ℉";
    windEl.textContent = "Wind: " + results.current.wind_speed + " MPH";
    humidityEl.textContent = "Humidity: " + results.current.humidity + "%";
    uvEl.textContent = results.current.uvi;

    displayFiveDay(results);
}

//history button display
function historyButtons(city) {
    var newButtonEl = document.createElement("BUTTON");
    newButtonEl.textContent = city;
    newButtonEl.classList.add("btn");
    newButtonEl.style.margin = "5px auto";
    historyContainer.appendChild(newButtonEl);

    newButtonEl.addEventListener("click", function(event) {
        event.preventDefault();
        apiCall(this.textContent);
    });
    return;
}
//uses first API to call next API to get weather conditions
function getConditions(lon, lat, cityEl) {

    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=dbe7ee0b24de9fd1a9ce2d793bf721a6&limit=1";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (results) {
                console.log(results);
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

// first API call for Long and Lat.
function apiCall(city) {
    document.getElementById("display-section").style.display = "block";
    //grab city from form
    document.querySelector("#input-field").value = "";
    var weatherUrl ="https://api.openweathermap.org/geo/1.0/direct?q="+city+",&appid=dbe7ee0b24de9fd1a9ce2d793bf721a6";
    //dbe7ee0b24de9fd1a9ce2d793bf721a6

    // make a request to the url
    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (results) {
                console.log(results);
                lon = results[0].lon;
                lat = results[0].lat;
                getConditions(lon, lat, city);         
            });
        } else {
            alert("Error: City not found, you may need to enter the name of a city!:)");
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
    document.querySelector("#input-field").value = "";
    cityEl = cityEl.charAt(0).toUpperCase() + cityEl.slice(1);
    console.log(cityEl);
    var weatherUrl ="https://api.openweathermap.org/geo/1.0/direct?q="+cityEl+",&appid=dbe7ee0b24de9fd1a9ce2d793bf721a6";
    //dbe7ee0b24de9fd1a9ce2d793bf721a6

    // make a request to the url
    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (results) {
                console.log(results);
                lon = results[0].lon;
                lat = results[0].lat;
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
