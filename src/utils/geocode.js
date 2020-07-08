const request = require('postman-request')

const getGeocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGV2Y2hrc3VtIiwiYSI6ImNrYzc0bXFvdDBoaDgyeHBodHBsd3k3aWUifQ._UXcKPHTp7Sv71FJfDRgrQ'
    request({url, json: true}, (error, {body}) => {
        console.log('Forecast request url: '+url)
        console.log('Body value: '+JSON.stringify(body))
        if(error){
            callback('Unable to retrieve Geocode', undefined)
        }else if(body.error || body.message){
            //need else if check on both body.error as well as body.message, because in return error when wrong address is passed. It is returning response with message
            callback('Unable to retrieve geocode, pls try again', undefined)
            
        }else if(body.features.length === 0){
            
            callback('Unable to retrieve geocode, pls try again', undefined)
                
        }else{
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = getGeocode