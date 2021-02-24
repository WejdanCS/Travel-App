import 'babel-polyfill';
import { getWeatherStatus } from "../src/server/apis/weatherBitApi";

describe("Testing the weather status functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getWeatherStatus() function", () => {
        var cityInfo = {
            longitude: '-0.12574',
            latitude: '51.50853',
            country: 'United Kingdom'
        }
        var date = "2021-02-21";
        expect(getWeatherStatus(cityInfo, date)).toBeDefined();
    })
});