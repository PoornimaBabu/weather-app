const request = require('request')

const getWeather = (latitude, longitude, callback) => {
    weatherURL = 'http://api.weatherstack.com/current?access_key=4f8356019d1d6d5b96e3dde9df5857f3&query=' + latitude + ',' + longitude
    request({url: weatherURL, json: true}, (error, resp) => {
        if(error){
            //console.log(error)
            callback('Unable to connect to Weather Services!', undefined)
        } else if(resp.body.error){
            callback('Please enter valid location!', undefined)
        } else{
            //console.log(resp)
            callback('', {
                forecast: resp.body.current.weather_descriptions[0] + '. Temperature is ' +  resp.body.current.temperature + ' celcius' + '. But feels like ' + resp.body.current.feelslike +  '.'
            })
        }
    })
}

module.exports = getWeather