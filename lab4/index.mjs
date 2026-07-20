import express from 'express';
import fetch from 'node-fetch';

const planets = (await import('npm-solarsystem')).default; // require -> await import
const app = express(); // app = the var needed to acess Express methods (can be any name)


app.set("view engine", "ejs"); // set ejs as templating language
// requires installing ejs beforehand
app.use(express.static("public")); //specify folder for static files

// root route: when opening browser in app's root folder, displays hello msg
// each route maps to a url
app.get('/', async(req, res) => {
    // display random img
    let apiKey = "js27Pk_QcTLRoCtR-dezrEVXDz_A5S-bdH9QyOucI0s";
	let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index",{"image":randomImage})
});

// route
app.get('/earth', (req, res) => { // view name
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', { planetEarth }) //earth.ejs must match this
});

app.get('/mars', (req, res) => { // view name
    let planetMars = planets.getMars();
    console.log(planetMars);
    res.render('mars', { planetMars })
});

// nasa
app.get('/nasa', async(req, res) => {
    // get nasa's image of the day
    let url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2026-07-14`;
let response = await fetch(url);
    let data = await response.json();
    let nasa_info = data;
    res.render('nasa', {nasa_info});
});

// query required: localhost:3000/planet?planetName=Earth
app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`](); // invoke func
    res.render('planet', { planetInfo, planetName });
});


// start server with port 3000
// arrow function to log console msg
app.listen(3000, () => {
    console.log('server started');
});
