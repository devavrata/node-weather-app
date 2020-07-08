const request = require('postman-request')

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e6fc17eec20f534e5feece697a7f518&query=' +lat+','+lng+ '&units=f'
    request({url, json: true}, (error, {body}) => {
        console.log('Weather forecast url: '+url)
        
        if(error){
            callback('Service is not working, please try later', undefined)
        }
        else if(body.error){
            callback('Unable to fetch forecast, pls try again', undefined)
        }
        else{
            // console.log('Weather forecast status code: '+statusCode+ 'temp: '+ temperature)
            // const forecastString = weather_descriptions+'. It is current: '+temperature+' but it feels like: '+feelslike
            // console.log('Weather forecast status code: '+response.statusCode+' response body: '+response.body.current)
            const forecastString = body.current.weather_descriptions[0]+'. It is current '+body.current.temperature+' but it feels like '+body.current.feelslike
            callback(undefined, forecastString)
            
        }
    })
}

//{statusCode, temperature}

module.exports = forecast