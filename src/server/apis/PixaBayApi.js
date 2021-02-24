const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

// Define global variables
const pixaBayAPIKey = process.env.PIXA_BAY_API_KEY;
const pixaBayAPI_Url = 'https://pixabay.com/api/';



var getCityPic = async(city) => {

    var picRequestUrl = `${pixaBayAPI_Url}/?key=${pixaBayAPIKey}&q=${city}&image_type=photo&category=places&per_page=8`;

    try {
        var response = await fetch(picRequestUrl);
        var allPics = await response.json();
        var selectedPics = allPics.hits;
        picsUrl = [];

        selectedPics.forEach(pic => {
            picsUrl.push(pic.webformatURL);

        });
        return {

            picsUrl


        };

    } catch (error) {
        // console.log(`ERROR:${error}`);
        return { errorMessage: `Error:${error.message}` };

    }


}

module.exports = {
    getCityPic
}