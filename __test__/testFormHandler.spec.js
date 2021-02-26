// Import the js file to test
import { checkWeatherStatus } from "../src/client/js/formHandler";

// check weather status in case within current week
describe("Testing the checkWeatherStatus functionality", () => {
    var weatherInfo = {
        date: "within current week",
        temp: "24",
        weather: "hh",
        windDir: "sss"

    };
    var cityPic = "https://pixabay.com/get/g95cb266e2eec2acb059fa478ae25e3385fe5f747bad97bf1a176ff2d97bf849e151954fcc22fe5910859d45c128f9050_640.jpg";
    var city = "london";
    var date = "25-02-2021";
    var tripInfoOutput = {
        type: "withinWeek",
        statusTitle: `Weather within Week in ${city} on ${date}:`,
        weatherStatus: `Temperature: ${weatherInfo.temp} C<br> Weather: ${weatherInfo.weather} <br>Wind direction: ${weatherInfo.windDir}`,
        cityPic,
    };
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkWeatherStatus() function", () => {

        expect(checkWeatherStatus(weatherInfo, cityPic, city, date)).toEqual(tripInfoOutput);
    })
});