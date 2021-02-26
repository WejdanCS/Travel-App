// Import the js file to test
import { isNotEmpty } from "../src/client/js/emptyChecker";

describe("Testing the isNotEmpty functionality", () => {
    var city = "london";
    var date = "2021-02-21";
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the isNotEmpty() function", () => {
            expect(isNotEmpty("")).toEqual(false);
        }),
        test("Testing the isNotEmpty() function", () => {
            expect(isNotEmpty(city)).toEqual(true);
        }),
        test("Testing the isNotEmpty() function", () => {
            expect(isNotEmpty(date)).toEqual(true);
        })
});