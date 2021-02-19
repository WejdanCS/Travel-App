const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");
// var city = "london"
const userName = process.env.GEO_USER_NAME;

// Define global variables
const GeoNamesBase_Url = 'http://api.geonames.org/';

var getCityInfo = async(city) => {
    // console.log(city)
    var GeoNamesAPI_Url = `${GeoNamesBase_Url}searchJSON?&q=${city}&username=${userName}`;

    try {
        var response = await fetch(GeoNamesAPI_Url);
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




module.exports = {
    getCityInfo
}