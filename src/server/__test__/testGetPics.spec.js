// Import the js file to test
import 'babel-polyfill';
import { getCityPic } from "../apis/PixaBayApi";

describe("Testing the getCityPic functionality", () => {
    var city = "london";
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getCityPic() function", async() => {
        var cityPics = await getCityPic(city);
        expect(cityPics).toEqual(expect.objectContaining(cityPics));
    })



});