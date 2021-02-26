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
            getCityPictures(cityPics, city)
        });



    } else {
        document.querySelector(".error-message").innerHTML = "please check your inputs";
    }
}

function getWeatherStatus(weatherInfo, cityPics, city, date) {

    if (weatherInfo.date == "within current week") {
        var results = document.querySelector(".results");
        var weatherStatusDiv = document.createElement("div");
        weatherStatusDiv.setAttribute("class", "weather-status");
        var saveTripInfo = document.createElement("i");
        saveTripInfo.setAttribute("class", "material-icons save-trip");
        saveTripInfo.innerHTML = "add";
        weatherStatusDiv.appendChild(saveTripInfo);
        var withinWeekDiv = document.createElement("div");
        withinWeekDiv.setAttribute("class", "withinWeek");
        var statusTitle = document.createElement("h3");
        statusTitle.setAttribute("class", "status-title");
        statusTitle.innerHTML = `Weather within Week in ${city} on ${date}:`;
        withinWeekDiv.appendChild(statusTitle);

        var weatherStatus = document.createElement("p");
        weatherStatus.setAttribute("class", "weather-status-result");
        weatherStatus.innerHTML = `temp: ${weatherInfo.temp} C<br> weather: ${weatherInfo.weather} <br>windDir: ${weatherInfo.windDir}`;
        withinWeekDiv.appendChild(weatherStatus);
        weatherStatusDiv.appendChild(withinWeekDiv);
        var cityImg = document.createElement("img");
        cityImg.setAttribute("class", "city-pic-result");
        cityImg.setAttribute("src", `${cityPics.picsUrl[0]}`);
        weatherStatusDiv.appendChild(cityImg);
        results.appendChild(weatherStatusDiv);
        saveTripInfo.addEventListener("click", function(event) {
            Client.saveTrip(event, weatherStatusDiv);
        });

    } else if (weatherInfo.date == "before current week") {

        var results = document.querySelector(".results");
        var weatherStatusDiv = document.createElement("div");
        weatherStatusDiv.setAttribute("class", "weather-status");
        var saveTripInfo = document.createElement("i");
        saveTripInfo.setAttribute("class", "material-icons save-trip");
        saveTripInfo.innerHTML = "add";
        weatherStatusDiv.appendChild(saveTripInfo);
        var beforeCurrentWeek = document.createElement("div");
        beforeCurrentWeek.setAttribute("class", "beforeCurrentWeek");
        var statusTitle = document.createElement("h3");
        statusTitle.setAttribute("class", "status-title");
        statusTitle.innerHTML = "Weather before current Week:";
        beforeCurrentWeek.appendChild(statusTitle);
        var weatherStatus = document.createElement("p");
        weatherStatus.setAttribute("class", "weather-status-result");
        weatherStatus.innerHTML = `min_temp: ${weatherInfo.min_temp} C<br> max_temp: ${weatherInfo.max_temp} C <br>wind_dir: ${weatherInfo.wind_dir}`;
        beforeCurrentWeek.appendChild(weatherStatus);
        var cityImg = document.createElement("img");
        cityImg.setAttribute("class", "city-pic-result");
        cityImg.setAttribute("src", `${cityPics.picsUrl[0]}`);
        weatherStatusDiv.appendChild(cityImg);

        weatherStatusDiv.appendChild(beforeCurrentWeek);
        results.appendChild(weatherStatusDiv);
        saveTripInfo.addEventListener("click", function(event) {
            Client.saveTrip(event, weatherStatusDiv);
        });
    } else {
        var errorMessage = document.querySelector(".error-message");
        errorMessage.innerHTML = weatherInfo.errorMessage;
    }


}

function getCityPictures(cityPics, city) {
    var cardsContiner = document.querySelector('.pics-cards-container');
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
}

function clearData() {
    var errorMessage = document.querySelector(".error-message");
    var results = document.querySelector(".results");
    var cityPics = document.querySelector(".pics-cards-container");
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




export { handleSubmit, getWeatherStatus, getCityPictures }