function handleSubmit(event) {
    event.preventDefault()
        // clear data 
    clearData();
    let city = document.getElementById('cityTextinput').value;
    let date = document.getElementById("tripDate").value;

    const postTripInfo = async(url = '', data = {}) => {

            const result = await fetch(url, {
                method: 'POST',
                cache: "no-cache",
                mode: "cors",
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            try {
                const data = await result.json();
                return data;
            } catch (error) {
                document.querySelector(".error-message").innerHTML = error.message;
            }
        }
        // check inputs if null or not
    if (Client.inputChecker(city) & Client.inputChecker(date)) {
        // post the day and city to server
        postTripInfo("http://localhost:8081/postTripInfo", {
            city,
            date,
        }).then(function(data) {
            const weatherInfo = data.weatherInfo;
            const cityPics = data.cityPics;
            // update UI


            //  get weatherData
            getWeatherStatus(weatherInfo, cityPics, city, date);
            //  get City pictures
            // getCityPictures(cityPics, city)
            if (weatherInfo.date != "after current week") {
                getCityPictures(cityPics, city);
            }

        });



    } else {
        document.querySelector(".error-message").innerHTML = "please check your inputs";
    }
}

function getWeatherStatus(weatherInfo, cityPics, city, date) {

    if (weatherInfo.date == "within current week") {
        var weatherStatusInfo = {
            type: "withinWeek",
            statusTitle: `Weather within Week in ${city} on ${date}:`,
            weatherStatus: `Temperature: ${weatherInfo.temp} C<br> Weather: ${weatherInfo.weather} <br>Wind direction: ${weatherInfo.windDir}`,
            cityPics,
        };
        displayWeatherStatus(weatherStatusInfo);

    } else if (weatherInfo.date == "before current week") {
        var weatherStatusInfo = {
            type: "beforeCurrentWeek",
            statusTitle: `Weather before current Week in ${city} on ${date}:`,
            weatherStatus: `Minimum temperature: ${weatherInfo.min_temp} C<br> Maximum temperature: ${weatherInfo.max_temp} C`,
            cityPics,
        };
        displayWeatherStatus(weatherStatusInfo);
    } else {
        var errorMessage = document.querySelector(".error-message");
        errorMessage.innerHTML = weatherInfo.errorMessage;
    }


}

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

// display weather status information on the screen
function displayWeatherStatus(weatherStatusInfo) {
    var results = document.querySelector(".results");
    var weatherStatusDiv = document.createElement("div");
    weatherStatusDiv.setAttribute("class", "weather-status");
    var saveTripInfo = document.createElement("i");
    saveTripInfo.setAttribute("class", "material-icons save-trip");
    saveTripInfo.innerHTML = "add";
    weatherStatusDiv.appendChild(saveTripInfo);
    var withinWeekDiv = document.createElement("div");
    withinWeekDiv.setAttribute("class", weatherStatusInfo.type);
    var statusTitle = document.createElement("h3");
    statusTitle.setAttribute("class", "status-title");
    statusTitle.innerHTML = weatherStatusInfo.statusTitle;
    withinWeekDiv.appendChild(statusTitle);

    var weatherStatus = document.createElement("p");
    weatherStatus.setAttribute("class", "weather-status-result");
    weatherStatus.innerHTML = weatherStatusInfo.weatherStatus;
    withinWeekDiv.appendChild(weatherStatus);
    weatherStatusDiv.appendChild(withinWeekDiv);
    var cityImg = document.createElement("img");
    cityImg.setAttribute("class", "city-pic-result");
    cityImg.setAttribute("src", `${weatherStatusInfo.cityPics.picsUrl[0]}`);
    weatherStatusDiv.appendChild(cityImg);
    results.appendChild(weatherStatusDiv);
    saveTripInfo.addEventListener("click", function(event) {
        Client.saveTrip(event, weatherStatusDiv);
    });

}




export { handleSubmit, getWeatherStatus, getCityPictures }