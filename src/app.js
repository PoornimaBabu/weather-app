const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/utils/geoCode')
const getWeather = require('../src/utils/getWeather')

const app = express()
const port = process.env.PORT || 3000

//Defining path for static and views
const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Serving Views and View Engine
app.set('views',viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//Serving static files
app.use(express.static(publicPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Poornima Babu.'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        name: 'Poornima Babu.',
        title: 'About'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Poornima Babu.'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.location){
        res.send({
            error: 'Please enter valid location!'
        })
    } else{
        const address = req.query.location
        geoCode(address,(error,{location, latitude, longitude} = {})=>{
            if(error){
               return res.send({error})
            }              
             getWeather(latitude, longitude, (error, {forecast} = {}) =>{
                 if(error){
                    return res.send({error}) 
                 }
                 res.send({
                    location,
                    forecast
                })
            })
        })
       
    }
})

app.get('/help/*', (req,res) => {
    res.render('404help', {
        name: 'Poornima Babu.',
        title: '404',
        errormessage: 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404page', {
        name: 'Poornima Babu.',
        title: '404',
        errormessage: 'Page not found!'
    })
})


app.listen(port, () => {
    console.log('Server running on port ', port)
})