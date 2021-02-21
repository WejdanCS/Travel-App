const dotenv = require("dotenv");
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
    var weatherApiUrl = `${weatherBitAPI_Url}/current?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&key=${weatherBitAPIKey}`;
    try {
        var response = await fetch(weatherApiUrl);
        var weatherDetails = await response.json();
        // console.log(weatherDetails.data)
        var weatherStatus = weatherDetails.data[0];
        return {
            windDir: weatherStatus.wind_cdir_full,
            temp: weatherStatus.temp,
            weather: weatherStatus.weather.description


        };

    } catch (error) {
        console.log(`ERROR:${error}`);
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
            picsUrl.push(pic.pageURL);
            console.log(pic.pageURL)

        });
        return {

            picsUrl


        };

    } catch (error) {
        console.log(`ERROR:${error}`);
    }


}



module.exports = {
    getCityInfo,
    getWeatherStatus,
    getCityPic

}