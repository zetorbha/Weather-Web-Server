const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/14ce8bf954f62e44aeb0a53a8b034417/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback({error:'Please check your internet, Unable to connecte'}, undefined)
        } else if (body.error) {
            callback({error:'Please check api URL'})

        } else {
            callback(body.daily.data[0].summary + ' Currently its ' + body.currently.temperature + ' Degree out there with ' + body.currently.precipProbability + '% of rain')

        }
    })
}

module.exports = forecast