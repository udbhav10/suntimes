import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const baseURLGeoCoding = "https://api.api-ninjas.com/v1/geocoding"; // get lat long from city name
const baseURLTimeZone = "https://api.geoapify.com/v1/geocode/reverse"; // get time zone from lat long
const baseURLSun = "https://api.sunrise-sunset.org/json"; // get sunrise and sunset time from lat long in local time zone

const API_KEY_GEOCODING = "+tapd4oxetkL5YBPRtKNAA==hcGQ2UpQ9Gv9GQ7b"; // use in header X-Api-Key
const API_KEY_GEOAPIFY = "42efd919f030434a914a8ace00eb802c"; // use in params apiKey

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", async (req, res) => {

    var cityName = req.body.city;

    //getting the latitude and longitude of the city
    try {
        var config_ninja = {
            params: {
                city: cityName
            },

            headers: {
                'X-Api-Key': API_KEY_GEOCODING
            }
        };

        const response_latlng = await axios.get(baseURLGeoCoding, config_ninja);
        var latlng = response_latlng.data;
        latlng = latlng[0];

        var latitude = latlng.latitude;
        var longitude = latlng.longitude;

    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }

    //getting the timezone from the lattitude and longitude
    try {
        var config_tz = {
            params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
                apiKey: API_KEY_GEOAPIFY
            }
        };

        const response_timezone = await axios.get(baseURLTimeZone, config_tz);
        var timeZone = response_timezone.data.results[0]['timezone'].name;

    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }

    //getting the sunset times from the latlng in the local timezone
    try {

        var config_sunset = {
            params: {
                lat: latitude,
                lng: longitude,
                tzId: timeZone
            }
        };

        const response_sunset = await axios.get(baseURLSun, config_sunset);
        var sunTimes = response_sunset.data;

        var sunrise = sunTimes.results.sunrise;
        var sunset = sunTimes.results.sunset;
        var dayLength = sunTimes.results.day_length;

        var data = {
            sunrise: sunrise,
            sunset: sunset,
            dayLength: dayLength,
            cityName: cityName
        };

        res.render('index.ejs', {
            timeData: data
        });

    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }


})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})