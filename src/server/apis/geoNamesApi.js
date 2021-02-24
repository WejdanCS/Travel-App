const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

// Define global variables
const geoNameApiUserName = process.env.GEO_USER_NAME;
const geoNamesBase_Url = 'http://api.geonames.org/';

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
        // console.log(`ERROR:${error}`);
        return { errorMessage: `Error:${error}` };

    }

}
module.exports = {
    getCityInfo

}