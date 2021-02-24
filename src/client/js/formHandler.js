var { inputChecker } = require("./emptyChecker");
var { checkTripDate } = require("./dateChecker");

function handleSubmit(event) {
    event.preventDefault()
        // clear error message text
    document.querySelectorAll(".error-message").innerHTML = "";
    // check inputs if null or not
    let city = document.getElementById('cityTextinput').value;
    // console.log(city)
    let date = document.getElementById("tripDate").value;
    // console.log(date)
    // if date and city not empty
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
    if (inputChecker(city) & inputChecker(date)) {
        // post the day and city to server
        console.log(city)
        console.log(date)
        postTripInfo("http://localhost:8081/postTripInfo", {
            city,
            date
        }).then(function(data) {
            const weatherInfo = data.weatherInfo;
            const cityPics = data.cityPics;
            // update UI
            console.log(weatherInfo);
            if (weatherInfo.date == "within current week") {
                console.log(weatherInfo.windDir)
                console.log(weatherInfo.temp)
                console.log(weatherInfo.weather)
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
                if (weatherStatusDiv.length != 0) {
                    weatherStatusDiv.innerHTML = "";
                }
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
                // console.log(weatherInfo.errorMessage);
                //  <div class="afterCurrentWeek">

                // </div>
                // <div id="error-message"></div>
                var afterCurrentWeek = document.querySelector(".afterCurrentWeek");
                var errorMessage = document.createElement("div");
                errorMessage.setAttribute("class", "error-message");
                errorMessage.innerHTML = weatherInfo.errorMessage;
                afterCurrentWeek.appendChild(errorMessage);
            }
            console.log(cityPics.picsUrl[0])
            var cardsContiner = document.querySelector('.pics-cards-container');
            if (cardsContiner.length != 0) {
                cardsContiner.innerHTML = "";
            }
            // cardsContiner
            let cardContainer = document.createDocumentFragment();
            // create cards and set images
            for (var i = 0; i < cityPics.picsUrl.length; i++) {
                console.log(cityPics.picsUrl[i]);
                let card = document.createElement("div");
                card.classList.toggle("card");
                card.classList.add('card');

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
            // document.appendChild(cardsContiner);
            console.log(cardsContiner)
        });


    } else {
        // console.log("ffff")
        document.querySelector(".error-message").innerHTML = "please check your inputs";
    }
}


export { handleSubmit }