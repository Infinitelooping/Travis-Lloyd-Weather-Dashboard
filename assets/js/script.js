//globals
var btnEl = document.querySelector("#btn");
var historyContainer = document.querySelector("#history-bar");


//display weather function
function displayWeather(results, cityEl) {
    console.log(results.data[0].latitude, cityEl)
}

//history button display
function historyButtons(city) {
    var newButtonEl = document.createElement("BUTTON");
    newButtonEl.textContent = city;
    newButtonEl.classList.add("btn");
    newButtonEl.style.margin = "10px auto";
    historyContainer.appendChild(newButtonEl);


}

//listening for when search button is pressed
btnEl.addEventListener("click", function (event) {
    event.preventDefault();
    //grab city from form
    var cityEl = document.querySelector("#input-field").value;
    console.log(cityEl);
    var weatherUrl ="http://api.positionstack.com/v1/forward?access_key=c4bf58a019f128c64c20b6e41582639b&query=" + cityEl + "&limit=1";

    // make a request to the url
    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (results) {
                displayWeather(results, cityEl);
            });
        } else {
            alert("Error: City not found");
        }
    })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to weather site");
        });
    historyButtons(cityEl);    

})