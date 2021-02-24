const dotenv = require("dotenv");
dotenv.config();
// const fetch = require("node-fetch");

// Define global variables
const weatherBitAPIKey = process.env.WEATHER_BIT_API_KEY;
const weatherBitAPI_Url = 'https://api.weatherbit.io/v2.0/';

var getWeatherStatus = async(cityInfo, date) => {
    // check if the date in the current week
    var isInCurrentWeek = checkTripDate(date);
    if (isInCurrentWeek) {
        var weatherApiUrl = `${weatherBitAPI_Url}/current?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&key=${weatherBitAPIKey}`;

        try {
            var response = await fetch(weatherApiUrl);
            var weatherDetails = await response.json();
            var weatherStatus = weatherDetails.data[0];
            return {
                date: "within current week",
                windDir: weatherStatus.wind_cdir_full,
                temp: weatherStatus.temp,
                weather: weatherStatus.weather.description


            };

        } catch (error) {
            return { errorMessage: `Error:${error}` };

        }
    } else {
        var endDate = getEndDate(date);
        var weatherApiUrl = `${weatherBitAPI_Url}/history/daily?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&start_date=${date}&end_date=${endDate}&key=${weatherBitAPIKey}`;
        try {
            var response = await fetch(weatherApiUrl);
            var weatherDetails = await response.json();
            if (Object.keys(weatherDetails.data).length !== 0) {
                var weatherStatus = weatherDetails.data[0];
                return {
                    date: "before current week",
                    wind_spd: weatherStatus.wind_spd,
                    snow: weatherStatus.snow,
                    wind_dir: weatherStatus.wind_dir,
                    max_wind_dir: weatherStatus.max_wind_dir,
                    min_temp: weatherStatus.min_temp,
                    max_temp: weatherStatus.max_temp,
                };
            } else {
                return { date: "after current week", errorMessage: "please enter date within week or before it" };
            }

        } catch (error) {
            return { errorMessage: `Error:${error}` };
        }
    }


}

var checkTripDate = (date) => {
    var tripDate = getTripDate(date);
    var curr = new Date(); // get current date
    // refrence>> stackoverflow.com
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var getWithinYear = withinYear(firstday, lastday, tripDate);
    var getWithinMonth = withinMonth(firstday, lastday, tripDate);
    var getWithinCurrentWeek = withinWeek(firstday, lastday, tripDate);
    if (getWithinCurrentWeek & getWithinMonth & getWithinYear) {
        return true;
    } else {
        return false;
    }
}
var getTripDate = (date) => {
    var parts = date.split('-');
    var tripDate = new Date(`${parts[0]}`, `${(parts[1]-1)}`, `${parts[2]}`);
    return tripDate;

}
var getEndDate = (date) => {
    var tripDate = getTripDate(date);
    var isInCurrentWeek = checkTripDate(date);
    try {
        if (!isInCurrentWeek) {
            var endDate = new Date(tripDate.getFullYear(), tripDate.getMonth(), (tripDate.getDate() + 1));
            endDate = `${endDate.getFullYear()}-${(endDate.getMonth()+1)}-${(endDate.getDate())}`;
            return endDate;

        }
    } catch (error) {
        return { errorMessage: `Error:${error.message}` };
    }
}

function withinYear(firstday, lastday, tripDate) {
    if ((tripDate.getFullYear() == firstday.getFullYear()) || (tripDate.getFullYear() == lastday.getFullYear())) {
        return true;
    } else {
        false;
    }
}

function withinMonth(firstday, lastday, tripDate) {
    if ((tripDate.getMonth() == firstday.getMonth()) || (tripDate.getMonth() == lastday.getMonth())) {
        return true;
    } else {
        return false;
    }
}

function withinWeek(firstday, lastday, tripDate) {
    if ((tripDate.getDate() >= firstday.getDate()) & (tripDate.getDate() <= lastday.getDate())) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    getWeatherStatus
}