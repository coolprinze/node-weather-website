const path = require('path');
const express = require('express');
const hbs = require('hbs');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Defines path for express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    pageTitle: 'Home',
    pageDesc: 'This is the about us page'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help',
    pageDesc: 'This is the help us page'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    msg: 'Error 404, Help article not found'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search)
    return res.send({
      error: 'Search params missing'
    });
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({
      error: 'Please add address params'
    });
  res.send({
    forcast: 'Its snowing',
    location: 'Nigeria',
    address: req.query.address
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    msg: 'Error 404, Page Not Found'
  });
});

// app.get('', (req, res) => {
//   res.send('Hello express');
// });

// app.get('/about', (req, res) => {
//   res.send({
//     pageTitle: 'about',
//     pageDesc: 'This is the about us page'
//   });
// });

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
