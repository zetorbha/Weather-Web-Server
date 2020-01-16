const request = require('request')

const geocode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?limit=1&access_token=pk.eyJ1IjoiemViaGFkcmEiLCJhIjoiY2szZnp2MmJ2MDljczNub3p3NzJlOXpmciJ9.adhKYX39-1w8Dj42_48X5g'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback({error:'Network Issues'}, undefined)
        } else if (body.features === undefined || body.features[0] === undefined) {
            callback({error:'API Token is incorrect'}, undefined)
            //body.features.length === 0
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode