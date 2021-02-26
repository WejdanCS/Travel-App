function saveTrip(event, weatherStatusDiv) {
    event.preventDefault()
    var savedTripSection = document.querySelector(".saved-trips-section");

    if (savedTripSection.innerHTML == 0) {
        var savedTripTitle = document.createElement("h3");
        savedTripTitle.setAttribute("class", "saved-trips-title");
        savedTripTitle.innerHTML = "Saved Trips ";
        savedTripSection.appendChild(savedTripTitle);

    }
    // Copy the <li> element and its child nodes
    var savedTrip = document.createElement("div");
    savedTrip.setAttribute("class", "saved-trip");
    var cln = weatherStatusDiv.cloneNode(true);
    var deleteAddIcon = cln.querySelector("i");
    cln.removeChild(deleteAddIcon);

    savedTrip.appendChild(cln);

    savedTripSection.appendChild(savedTrip);

}
export { saveTrip }