import 'babel-polyfill';
import { getWeatherStatus } from "../apis/weatherBitApi";

describe("Testing the weather status functionality", () => {
    var cityInfo = {
        longitude: '-0.12574',
        latitude: '51.50853',
        country: 'United Kingdom'
    }
    var date = "2021-02-21";
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getWeatherStatus() function", async() => {
        var weatherStatus = await getWeatherStatus(cityInfo, date)
        expect(weatherStatus).toEqual(expect.objectContaining(weatherStatus))
    })
});