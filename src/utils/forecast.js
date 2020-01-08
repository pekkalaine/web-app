const request = require('request')

const forecast = (lat, long, callback) => {

    const url ='https://api.darksky.net/forecast/a1636f1f7ccbd8b867c1fecf4a21e145/' + lat + ',' + long
    
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                'Lämpötila: '+ body.currently.temperature
               )
        }
    })
}

module.exports = forecast