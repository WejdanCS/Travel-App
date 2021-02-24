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

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
});

app.post("/postTripInfo", async(req, res) => {
    const city = req.body.city;
    let date = req.body.date;
    var cityInfo = await getCityInfo(city);
    var weatherInfo = await getWeatherStatus(cityInfo, date);
    var cityPics = await getCityPic(city);
    res.send({ weatherInfo, cityPics })

});