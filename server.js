const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error) {
      console.log('Unable to append to server.log.');
    }
  })
  next();
});

app.use((req, res, next) => {
  // res.render('maintenance.hbs');
  next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Homepage',
    welcomeMsg: 'Welcome to my Homepage'
  });
  // res.send({
  //   name: 'Kevin',
  //   likes: [
  //     'Gaming',
  //     'Soccer'
  //   ]
  // });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMsg: 'Welcome to my portfolio page'
  });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to handle request!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on Port ${port}`);
});