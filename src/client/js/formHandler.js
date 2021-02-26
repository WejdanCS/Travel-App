function handleSubmit(event) {
    event.preventDefault()
        // clear data 
    clearData();
    let city = document.getElementById('cityTextinput').value;
    let date = document.getElementById("tripDate").value;
    // check inputs if empty or not
    if (Client.isNotEmpty(city) & Client.isNotEmpty(date)) {
        // post the day and city to server
        Client.postData("http://localhost:8081/postTripInfo", {
            city,
            date,
        }).then(function(data) {
            const weatherInfo = data.weatherInfo;
            const cityPics = data.cityPics;
            // update UI
            //  check weather status and return information
            var tripInfo = checkWeatherStatus(weatherInfo, cityPics.picsUrl[0], city, date);
            //  get City pictures
            if (tripInfo.type != "afterCurrentWeek") {
                Client.displayWeatherStatus(tripInfo, ".results");
                getCityPictures(cityPics, city);
            } else {

                Client.displayErrorMsg(tripInfo.errorMessage);
            }
        });
    } else {
        // display error message if input|inputs are empty
        Client.displayErrorMsg("please check your inputs");
    }
}

/**
 * 
 * @param {object:contains weather information} weatherInfo 
 * @param {variable contain picture Url} cityPic 
 * @param  city 
 * @param date 
 * returns object 
 */
function checkWeatherStatus(weatherInfo, cityPic, city, date) {

    if (weatherInfo.date == "within current week") {
        var tripInfo = {
            type: "withinWeek",
            statusTitle: `Weather within Week in ${city} on ${date}:`,
            weatherStatus: `Temperature: ${weatherInfo.temp} C<br> Weather: ${weatherInfo.weather} <br>Wind direction: ${weatherInfo.windDir}`,
            cityPic,
        };
        return tripInfo;
        // Client.displayWeatherStatus(tripInfo, ".results");

    } else if (weatherInfo.date == "before current week") {
        var tripInfo = {
            type: "beforeCurrentWeek",
            statusTitle: `Weather before current Week in ${city} on ${date}:`,
            weatherStatus: `Minimum temperature: ${weatherInfo.min_temp} C<br> Maximum temperature: ${weatherInfo.max_temp} C`,
            cityPic,
        };
        return tripInfo;
        // Client.displayWeatherStatus(tripInfo, ".results");
    } else {

        var tripInfo = {
            type: "afterCurrentWeek",
            errorMessage: weatherInfo.errorMessage,

        };
        // var errorMessage = document.querySelector(".error-message");
        // errorMessage.innerHTML = weatherInfo.errorMessage;
        return tripInfo;
    }


}
/**
 * 
 * @param {all pictures which returend from PixaBay Api} cityPics 
 * @param city 
 */
function getCityPictures(cityPics, city) {
    // pics-list-title
    // <section class="city-pics-list">
    var cityPicsSection = document.querySelector(".city-pics-list");
    var cityPicsTitle = document.createElement("h3");
    cityPicsTitle.innerHTML = `Beautiful pictures in ${city}`;
    cityPicsTitle.setAttribute("class", "pics-list-title");

    cityPicsSection.appendChild(cityPicsTitle);
    var cardsContiner = document.createElement("div");
    cardsContiner.setAttribute("class", "pics-cards-container");
    // cardsContiner
    let cardContainer = document.createDocumentFragment();
    // create cards and set images
    for (var i = 0; i < cityPics.picsUrl.length; i++) {
        let card = document.createElement("div");
        card.classList.toggle("card");
        // image
        var image = document.createElement("img");
        // set class to image
        image.setAttribute("class", 'city-pic');
        // set the src for image
        image.src = cityPics.picsUrl[i];
        // set alt to image
        image.setAttribute("alt", `city${city}`);
        card.appendChild(image);

        cardContainer.appendChild(card);
    }
    cardsContiner.appendChild(cardContainer);
    cityPicsSection.appendChild(cardsContiner);
}
// clear all childrens in the DOM elements
function clearData() {
    var errorMessage = document.querySelector(".error-message");
    var results = document.querySelector(".results");
    var cityPics = document.querySelector(".city-pics-list");
    if (errorMessage.innerHTML != 0) {
        errorMessage.innerHTML = "";
    }
    if (results.innerHTML != 0) {
        results.innerHTML = "";
    }
    if (cityPics.innerHTML != 0) {
        cityPics.innerHTML = "";

    }

}

export { handleSubmit, checkWeatherStatus, getCityPictures }