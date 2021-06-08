const request = require('request')

const geoCode = (address,callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoicG9vcm5pMjQiLCJhIjoiY2twaWVneHh1MzBlbTMxbnhidmxwbjlteCJ9.-9HTOYRGtuJnQmUderA3Tg&limit=1'

    request({url:geoURL, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Geo Locations!', undefined)
        } else if(body.features.length === 0){
            callback('Could not find location. Please enter valid location.', undefined)
        } else{
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geoCode