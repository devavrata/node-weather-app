const path = require('path')
const hbs = require('hbs')
const express = require('express')
const getGeocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsDirectoryPath)

app.set('views', viewsDirectoryPath)
app.set('view engine', 'hbs')



app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Devavrata',
        surname: 'Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Indrani',
        helpText: 'Welcome to the Help page, we will help you fix problem'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Devavrata',
        surname: 'Sharma'
    })
})

app.get('/weather', (req,res) => {

    const addressSearchTerm = req.query.address;

    if(!addressSearchTerm){
        return res.send({
            error:'Please provide the address search term'
        })
    }

//fetch address's lat lng using geocode

getGeocode(addressSearchTerm, (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({
            error:'Please provide the proper address search term'
        })
    }else{
        //now call forecast to use lat lng to fetch weather report
        forecast(latitude, longitude, (error, response) => {
            
            if(error){
                return res.send({
                    error:'Unable to fetch weather for this address, please try again'
                })   
            }else{
                //send weather report
                return res.send({
                    address: addressSearchTerm,
                    forecast: response,
                    location: location
                })
            }
        })
    }
})

    // res.send({
    //     address: addressSearchTerm,
    //     forecast: 'Forecast report will be shown soon...',
    //     location: 'Varanasi'
    // })
})

app.get('/help/*', (req, res) => {
    res.render('error_404',{
        title:'404 Page',
        name: 'Devavrata Sharma',
        errorMessage: 'Unable to find this help page'
    })

})

app.get('/about/*', (req, res) => {
    res.render('error_404',{
        title:'404 Page',
        name: 'Devavrata Sharma',
        errorMessage: 'Unable to find this about page for: '+req.path
    })
})

//wild char to handle any page which is not matched by express or we have included in this for eg. things other than /, /About, /help etc
app.get('*', (req, res) => {
    res.render('error_404', {
        title: '404 Page',
        errorMessage: 'Unable to find page',
        name: 'Devavrata Sharma'
    })
})

app.listen(3000, () => {
    console.log('Server started at port 3000')
})


//app.com
//app.com/help
//app.com/about