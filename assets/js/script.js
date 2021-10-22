//globals
var btnEl = document.querySelector("#btn");
var historyContainer = document.querySelector("#history-bar");


//display weather function
function displayWeather(data, cityEl, event) {
    event.preventDefault();
    console.log(data, cityEl)
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
    var weatherUrl = "api.openweathermap.org/data/2.5/weather?q="+cityEl+"&appid=" + "dbe7ee0b24de9fd1a9ce2d793bf721a6";

    // make a request to the url
    fetch(weatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data, cityEl);
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