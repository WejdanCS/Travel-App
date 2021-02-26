/**
 * 
 * @param  event 
 * @param  tripInfo 
 * save trip information and post it to server then display it on the screen
 */
function saveTrip(event, tripInfo) {
    event.preventDefault()
    Client.postData("http://localhost:8081/SaveTripInfo", {
        tripInfo
    }).then(function(data) {
        var savedTripSection = document.querySelector(".saved-trips-section");
        if (savedTripSection.innerHTML == 0) {
            var savedTripTitle = document.createElement("h3");
            savedTripTitle.setAttribute("class", "saved-trips-title");
            savedTripTitle.innerHTML = "Saved Trips ";
            savedTripSection.appendChild(savedTripTitle);
        }
        var savedTrip = document.createElement("div");
        savedTrip.setAttribute("class", "saved-trip");
        Client.displayWeatherStatus(data, ".saved-trips-section");
    });
}
export { saveTrip }