const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    //encodeURIComponent handles errors when special characters are entered like ? now converts to %3F instead of crashing
    const url = 'https://api.darksky.net/forecast/e581a7e3d937dd5c0bea69826ce1e959/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    
    
    request( { url, json: true}, (error, {body} = {}) => { // this request takes a url for some weather information in the url and gives us the response found in that url in the response variable, which we only use its body by destructuring
        // const data = JSON.parse(response.body) // no need to parse our response to json as the json: true does that for us
        // console.log(response.body.currently) // body and currently is used to filter the wanted information in the response for us
        if (error) {
            callback("unable to connect to weather services", undefined)
            
        } else if (body.error) {
            callback("unable to find location", undefined)
        }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainProbability: body.currently.precipProbability 
            })
        }   
    })
}

module.exports = forecast
