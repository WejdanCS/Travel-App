// Import the js file to test
import { inputChecker } from "../src/client/js/emptyChecker";

describe("Testing the inputChecker functionality", () => {
    var city = "london";
    var date = "2021-02-21";
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the inputChecker() function", () => {
            expect(inputChecker(city)).toBeDefined();
        }),
        test("Testing the inputChecker() function", () => {
            expect(inputChecker("")).toBeFalsy();
        }),
        test("Testing the inputChecker() function", () => {
            expect(inputChecker(city)).toBeTruthy();
        }),
        test("Testing the inputChecker() function", () => {
            expect(inputChecker(date)).toBeDefined();
        }),
        test("Testing the inputChecker() function", () => {
            expect(inputChecker(date)).toBeTruthy();
        })
});