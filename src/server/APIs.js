const dotenv = require("dotenv");
const e = require("express");
dotenv.config();
const fetch = require("node-fetch");
// var city = "london"
const geoNameApiUserName = process.env.GEO_USER_NAME;
const weatherBitAPIKey = process.env.WEATHER_BIT_API_KEY;
const pixaBayAPIKey = process.env.PIXA_BAY_API_KEY;

// Define global variables
const geoNamesBase_Url = 'http://api.geonames.org/';
const weatherBitAPI_Url = 'https://api.weatherbit.io/v2.0/';
const pixaBayAPI_Url = 'https://pixabay.com/api/';


var getCityInfo = async(city) => {
    // console.log(city)
    var geoNamesAPI_Url = `${geoNamesBase_Url}searchJSON?&q=${city}&username=${geoNameApiUserName}`;

    try {
        var response = await fetch(geoNamesAPI_Url);
        var cityDetails = await response.json();
        var cityInfo = cityDetails.geonames[0];
        return {
            longitude: cityInfo.lng,
            latitude: cityInfo.lat,
            country: cityInfo.countryName
        };

    } catch (error) {
        console.log(`ERROR:${error}`);
    }
}

var getWeatherStatus = async(cityInfo, date) => {
    // https://api.weatherbit.io/v2.0/current
    // check if the date in the current week
    var isInCurrentWeek = checkTripDate(date);
    console.log(date)
    console.log(isInCurrentWeek)

    if (isInCurrentWeek == "within week") {
        var weatherApiUrl = `${weatherBitAPI_Url}/current?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&key=${weatherBitAPIKey}`;

        try {
            var response = await fetch(weatherApiUrl);
            var weatherDetails = await response.json();
            // console.log(weatherDetails.data)
            var weatherStatus = weatherDetails.data[0];
            return {
                date: "within current week",
                windDir: weatherStatus.wind_cdir_full,
                temp: weatherStatus.temp,
                weather: weatherStatus.weather.description


            };

        } catch (error) {
            console.log(`ERROR:${error}`);
        }
    } else if (isInCurrentWeek == "before current week") {

        var endDate = getEndDate(date);
        console.log(`Start Date :${date}/n End Date :${endDate}`)
        var weatherApiUrl = `${weatherBitAPI_Url}/history/daily?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&start_date=${date}&end_date=${endDate}&key=${weatherBitAPIKey}`;
        try {
            // 
            console.log(weatherApiUrl)
            var response = await fetch(weatherApiUrl);
            var weatherDetails = await response.json();
            var weatherStatus = weatherDetails.data[0];
            console.log(weatherStatus.wind_spd)
                // var weatherStatus = weatherDetails.data[0];
            return {
                date: "before current week",
                wind_spd: weatherStatus.wind_spd,
                snow: weatherStatus.snow,
                wind_dir: weatherStatus.wind_dir,
                max_wind_dir: weatherStatus.max_wind_dir,
                min_temp: weatherStatus.min_temp,
                max_temp: weatherStatus.max_temp,
            };
        } catch (error) {

            console.log(`ERROR:${error}`);
        }
    } else {

        return { date: "after current week", errorMessage: "please enter date within week or before it" };
    }


}
var getCityPic = async(city) => {

    var picRequestUrl = `${pixaBayAPI_Url}/?key=${pixaBayAPIKey}&q=${city}&image_type=photo&category=places&per_page=8`;

    try {
        var response = await fetch(picRequestUrl);
        var allPics = await response.json();
        // console.log(allPics)
        var selectedPics = allPics.hits;
        picsUrl = [];

        selectedPics.forEach(pic => {
            // console.log(pic)
            picsUrl.push(pic.webformatURL);
            console.log(pic.webformatURL)

        });
        return {

            picsUrl


        };

    } catch (error) {
        console.log(`ERROR:${error}`);
    }


}

var checkTripDate = (date) => {
    var tripDate = getTripDate(date);

    var curr = new Date(); // get current date
    console.log(curr)
        // refrence>> stackoverflow.com
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    // var tripDate = new Date.parse(date);
    console.log(curr.getMonth() + 1)
    console.log(firstday.getDate())
    console.log(lastday.getDate())
        // var inWeek = [firstday.getDate(), lastday.getDate()]
    console.log(firstday)
    console.log(tripDate)
    if (tripDate.getDate() >= firstday.getDate() & tripDate.getDate() <= lastday.getDate()) {
        // the trip date in the current week
        return "within week";

        // } else if (tripDate.getDate() <= firstday.getDate() & (tripDate.getMonth() <= firstday.getMonth())) {
        //     // console.log("GGGGG")
        //     return "before current week";
        // } else if (tripDate.getDate() >= firstday.getDate() & tripDate.getMonth() <= firstday.getMonth()) {
        //     console.log("HHHHHH")
        //     return "before current week";

        // } else if (((tripDate.getDate() <= firstday.getDate()) || (tripDate.getDate() >= lastday.getDate())) & (tripDate.getFullYear() < firstday.getFullYear())) {
        //     return "before current week";

    } else if (((tripDate.getDate() > lastday.getDate())) & ((tripDate.getMonth() >= lastday.getMonth())) & (tripDate.getFullYear() >= lastday.getFullYear())) {
        return "after current week";
    } else {
        return "before current week";
    }



}
var getTripDate = (date) => {
    var parts = date.split('-');
    console.log(parts[0]);
    console.log(parts[1]);
    console.log(parts[2]);
    var tripDate = new Date(`${parts[0]}`, `${(parts[1]-1)}`, `${parts[2]}`);
    return tripDate;

}
var getEndDate = (date) => {
    var tripDate = getTripDate(date);
    var isInCurrentWeek = checkTripDate(date);
    try {
        if (isInCurrentWeek == "before current week") {
            var endDate = new Date(tripDate.getFullYear(), tripDate.getMonth(), (tripDate.getDate() + 1));
            // endDate.setDate(tripDate.getDate());
            console.log(`end date ::${endDate}`)
            endDate = `${endDate.getFullYear()}-${(endDate.getMonth()+1)}-${(endDate.getDate())}`;
            return endDate;

        }
    } catch (e) {
        console.log(e.message);
    }



}


module.exports = {
    getCityInfo,
    getWeatherStatus,
    getCityPic

}