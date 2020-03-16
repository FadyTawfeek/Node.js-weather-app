const request = require ('request')

const geoCode = (address, callback) => {
    //encodeURIComponent handles errors when special characters are entered like ? now converts to %3F instead of crashing
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFkeWZheWVrMjAxMCIsImEiOiJjazdxdGo4b3AwNzFoM21xZHdhMnA3dmdpIn0.0uecxxsCp1011jj15NbSzg&limit=1'
    
    request( {url, json: true}, (error, {body} = {}) => { //this request gives us the latitude and longitude of an address we inquire about, which we only use its body by destructuring
        if (error) {
            callback("unable to connect to location services", undefined)

        } else if ((body.features == undefined) || (body.features.length === 0)) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0] 
            })
        }
    })

}

module.exports = geoCode
