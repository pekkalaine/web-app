const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'Message 1',
        name: 'Andrew'

    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {

        if(error) return res.send({error})
        
        forecast(latitude, longitude, (error, forecastData) => {

            if(error) return res.send({error: error})

            res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                        
                    })
            })
    })
})


app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        message: 'Help article not found',
        name: 'Andrew'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        message: 'Page not found',
        name: 'Andrew'
    })
})

app.listen(3000, () => {
    console.log('server running')
})