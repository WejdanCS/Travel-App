const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express()
const { getCityInfo, getWeatherStatus, getCityPic } = require('./APIs');
app.use(cors())
app.use(bodyParser.json())
    // to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('./src/client/views'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
});

app.post("/postCityInfo", async(req, res) => {
    const city = req.body.city;


    // console.log(req.body.city);
    var cityInfo = await getCityInfo(city);
    // res.send(cityInfo)

    // vaer 
    var weatherInfo = await getWeatherStatus(cityInfo, "20-02-2021");
    console.log(weatherInfo)
    var weatherInfo = await getCityPic(city);

    res.send(weatherInfo)

});