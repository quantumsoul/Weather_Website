const request = require('request')
const forecast = (longitude,latitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c8ef1ba03235c6b62c9e76bde55babaf&query='+latitude+','+longitude+'&units=f'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services')
        }else if(body.error){
            callback('unable to find the location.')
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}
module.exports = forecast