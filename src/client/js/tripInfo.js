/**
 * 
 * @param  tripInfo 
 * @param position 
 * take the tripInfo and display weather status information on the screen based on specific postion on the screen
 */
function displayWeatherStatus(tripInfo, position) {
    var results = document.querySelector(position);
    var weatherStatusDiv = document.createElement("div");
    weatherStatusDiv.setAttribute("class", "weather-status");
    var saveTripIcon = document.createElement("i");
    saveTripIcon.setAttribute("class", "material-icons save-trip");
    saveTripIcon.innerHTML = "add";
    weatherStatusDiv.appendChild(saveTripIcon);
    // save trip information when click on add icon
    saveTripIcon.addEventListener("click", function(event) {
        Client.saveTrip(event, tripInfo);
    });
    var withinWeekDiv = document.createElement("div");
    withinWeekDiv.setAttribute("class", tripInfo.type);
    var statusTitle = document.createElement("h3");
    statusTitle.setAttribute("class", "status-title");
    statusTitle.innerHTML = tripInfo.statusTitle;
    withinWeekDiv.appendChild(statusTitle);

    var weatherStatus = document.createElement("p");
    weatherStatus.setAttribute("class", "weather-status-result");
    weatherStatus.innerHTML = tripInfo.weatherStatus;
    withinWeekDiv.appendChild(weatherStatus);
    weatherStatusDiv.appendChild(withinWeekDiv);
    var cityImg = document.createElement("img");
    cityImg.setAttribute("class", "city-pic-result");
    cityImg.setAttribute("src", `${tripInfo.cityPic}`);
    weatherStatusDiv.appendChild(cityImg);
    results.appendChild(weatherStatusDiv);
    // check if this section is saved trip section
    if (position === ".saved-trips-section") {
        if (results.innerHTML == 0) {
            var savedTripTitle = document.createElement("h3");
            savedTripTitle.setAttribute("class", "saved-trips-title");
            savedTripTitle.innerHTML = "Saved Trips ";
            results.appendChild(savedTripTitle);
        }
        var savedTrip = document.createElement("div");
        savedTrip.setAttribute("class", "saved-trip");
        var deleteAddIcon = results.querySelector("i");
        weatherStatusDiv.removeChild(deleteAddIcon);
        results.appendChild(savedTrip);
    }
}

export {
    displayWeatherStatus,
}