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
                console.log(`ERROR:${error.message}`);
                document.querySelector(".error-message").innerHTML = error.message;
            }
        }
        // check inputs if null or not
    if (Client.inputChecker(city) & Client.inputChecker(date)) {
        // post the day and city to server
        postTripInfo("http://localhost:8081/postTripInfo", {
            city,
            date
        }).then(function(data) {
            const weatherInfo = data.weatherInfo;
            const cityPics = data.cityPics;
            // update UI
            //  get weatherData
            getWeatherStatus(weatherInfo);
            //  get City pictures
            getCityPictures(cityPics, city)
        });


    } else {
        document.querySelector(".error-message").innerHTML = "please check your inputs";
    }
}

function getWeatherStatus(weatherInfo) {
    console.log(weatherInfo)
    if (weatherInfo.date == "within current week") {
        var weatherStatusDiv = document.querySelector(".weather-status");
        var statusTitle = document.createElement("h3");
        statusTitle.setAttribute("class", "status-title");
        statusTitle.innerHTML = "Weather within Week:";
        weatherStatusDiv.appendChild(statusTitle);
        var withinWeekDiv = document.createElement("div");
        withinWeekDiv.setAttribute("class", "withinWeek");
        var weatherStatus = document.createElement("p");
        weatherStatus.setAttribute("class", "weather-status-result");
        weatherStatus.innerHTML = `temp: ${weatherInfo.temp} C<br> weather: ${weatherInfo.weather} <br>windDir: ${weatherInfo.windDir}`;
        withinWeekDiv.appendChild(weatherStatus);
        weatherStatusDiv.appendChild(withinWeekDiv);
    } else if (weatherInfo.date == "before current week") {

        var weatherStatusDiv = document.querySelector(".weather-status");
        var statusTitle = document.createElement("h3");
        statusTitle.setAttribute("class", "status-title");
        statusTitle.innerHTML = "Weather before current Week:";
        weatherStatusDiv.appendChild(statusTitle);
        var withinWeekDiv = document.createElement("div");
        withinWeekDiv.setAttribute("class", "beforeCurrentWeek");
        var weatherStatus = document.createElement("p");
        weatherStatus.setAttribute("class", "weather-status-result");
        weatherStatus.innerHTML = `min_temp: ${weatherInfo.min_temp} C<br> max_temp: ${weatherInfo.max_temp} C <br>wind_dir: ${weatherInfo.wind_dir}`;
        withinWeekDiv.appendChild(weatherStatus);
        weatherStatusDiv.appendChild(withinWeekDiv);
        console.log(weatherInfo.wind_dir)
    } else {
        var weatherStatusDiv = document.querySelector(".weather-status");
        var afterCurrentWeek = document.createElement("div");
        afterCurrentWeek.setAttribute("class", "afterCurrentWeek");
        var errorMessage = document.createElement("p");
        errorMessage.setAttribute("class", "error-message");
        errorMessage.innerHTML = weatherInfo.errorMessage;
        afterCurrentWeek.appendChild(errorMessage);
        weatherStatusDiv.appendChild(afterCurrentWeek);
    }


}

function getCityPictures(cityPics, city) {
    var cardsContiner = document.querySelector('.pics-cards-container');
    // console.log(cardContainer)
    // cardsContiner
    let cardContainer = document.createDocumentFragment();
    // create cards and set images
    for (var i = 0; i < cityPics.picsUrl.length; i++) {
        // console.log(cityPics.picsUrl[i]);
        let card = document.createElement("div");
        card.classList.toggle("card");
        // card.classList.add('card');

        // image
        var image = document.createElement("img");
        // set class to image
        image.setAttribute("class", 'city-pic');
        // set the src for image
        // image.setAttribute("src", `${cityPics.picsUrl[i]}`);
        image.src = cityPics.picsUrl[i];
        // set alt to image
        image.setAttribute("alt", `city${city}`);
        card.appendChild(image);

        cardContainer.appendChild(card);
    }
    cardsContiner.appendChild(cardContainer);
}

function clearData() {
    document.querySelector(".error-message").innerHTML = "";
    document.querySelector(".weather-status").innerHTML = "";
    document.querySelector(".pics-cards-container").innerHTML = "";

}
export { handleSubmit, getWeatherStatus, getCityPictures }