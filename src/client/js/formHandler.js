var { inputChecker } = require("./emptyChecker");
var { checkTripDate } = require("./dateChecker");

function handleSubmit(event) {
    event.preventDefault()
        // clear error message text
    document.getElementById("error-message").innerHTML = "";
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
            document.getElementById("error-message").innerHTML = error.message;
        }
    }
    if (inputChecker(city) & inputChecker(date)) {
        // post the day and city to server
        console.log(city)
        console.log(date)
            // let d = new Date();
            // let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
            // console.log(d.getDate())
            // var isInCurrentWeek = checkTripDate(date);
            // console.log(isInCurrentWeek)



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

            } else if (weatherInfo.date == "before current week") {
                /**
                 * 
                 *   wind_spd: weatherStatus.wind_spd,
                snow: weatherStatus.snow,
                wind_dir: weatherStatus.wind_dir,
                max_wind_dir: weatherStatus.max_wind_dir,
                min_temp: weatherStatus.min_temp,
                max_temp: weatherStatus.max_temp,
                 */
                console.log(weatherInfo.wind_dir)

            } else {
                // console.log(weatherInfo.errorMessage);
                document.getElementById("error-message").innerHTML = weatherInfo.errorMessage;

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
        document.getElementById("error-message").innerHTML = "please check your inputs";
    }



    // return true if url is valid
    // var isValid = Client.checkArticleUrl(articleUrl);
    // const postArticleUrl = async(url = '', data = {}) => {

    //     const result = await fetch(url, {
    //         method: 'POST',
    //         cache: "no-cache",
    //         mode: "cors",
    //         credentials: 'same-origin',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data),
    //     });
    //     try {
    //         const data = await result.json();
    //         return data;
    //     } catch (error) {
    //         console.log(`ERROR:${error.message}`);
    //         document.getElementById("results").innerHTML = error.message;
    //     }
    // }

    // if (isValid) {
    //     postArticleUrl("http://localhost:8081/PostArticleUrl", {
    //         articleUrl
    //     }).then(function(data) {
    //         document.getElementById("scoreTag").innerHTML = `Score Tag: ${data.score_tag}`;
    //         document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
    //         document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
    //         document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
    //         document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;


    //     });
    // } else {
    //     alert("please enter valid url")

    // }
}


export { handleSubmit }