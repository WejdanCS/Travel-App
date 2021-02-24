const dotenv = require("dotenv");
dotenv.config();
// const fetch = require("node-fetch");
const { getCityInfo } = require('./apis/geoNamesApi');
const { getWeatherStatus } = require("./apis/weatherBitApi");
const { getCityPic } = require("./apis/PixaBayApi");

module.exports = {
    getCityInfo,
    getWeatherStatus,
    getCityPic

}