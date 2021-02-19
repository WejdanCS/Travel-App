const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express()
const { getCityInfo } = require('./APIs');
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

    // console.log(req.body.city);
    var cityInfo = await getCityInfo(req.body.city);
    res.send(cityInfo)

});