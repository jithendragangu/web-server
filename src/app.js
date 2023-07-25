const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jithendra Gangu',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jithendra Gangu',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'please contact the given email address Thank You',
    title: 'Help',
    name: 'Jithendra Gangu',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You Must Provide an address' });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longtitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longtitude, (error, data) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: data,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide the search term',
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found.',
    title: '404',
    name: 'Jithendra Gangu',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found.',
    title: '404',
    name: 'Jithendra Gangu',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
