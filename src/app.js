const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));


const app = express();
const port= process.env.PORT || 3000;
//paths for express
const pubDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templats/views')
const partialPath = path.join(__dirname, '../templats/partials')
//Setup Static directory for express to serve
app.use(express.static(pubDir))


//Setup handelbar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// const info=[{
//     name: 'Abhijit',
//     age: 29
// },{
//     name: 'Sese',
//     age: 'a billion years'
// }

// ]

// app.get('/help', (req, res) =>{
//     res.send(info[0].name+ ' and '+ info[1].name)
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhijit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhijit '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        mesg: 'This is the help page',
        name: 'Abhijit '
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({error:'You must provide an ADDRESS'})

    } else {
        geocode(req.query.address, (geocodeError, { latitude, longitude, place }={} ) => {
            if (geocodeError) {
                return res.send({geocodeError})
            }

            forecast(latitude, longitude, (forecastData, forecastError) => {
                if (forecastError) {
                    return res.send({forecastError})
                }
                // console.log(place)
                // console.log(forecastData)
                res.send({
                    place: place,
                    forecastData: forecastData
                })
            })
        })
    }
    // if (!req.query.address) {
    //     return res.send('you must provide an address term')
    // }
    // res.send(req.query)
})
// app.get('/about', (req, res) =>{
//     res.send('<h1>About</h1>')
// })
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'The help artical you are looking for is not found',
        name: 'Abhijit '

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'page not found',
        name: 'Abhijit '

    })
})
app.listen(port, () => {
    console.log('server is up on '+ port)
})