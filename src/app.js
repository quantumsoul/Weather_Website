const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { title } = require('process')
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Prakhar Nigam'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Us',
        name: 'Prakhar Nigam'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        msg: 'Helpful text',
        title: 'Help',
        name: 'Prakhar Nigam'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Prakhar Nigam',
        error: 'No Help Article found!'
    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Prakhar Nigam',
        error: 'Error 404'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port' + port)
})