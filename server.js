"use strict"
/* Serveur pour le site de quiz*/
var express = require('express');
var mustache = require('mustache-express');
let alert = require('alert');

var model = require('./model');
var app = express();

// parse form arguments in POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

const cookieSession = require('cookie-session');
const { Console } = require('console');
app.use(cookieSession({
secret: 'mot-de-passe-du-cookie',
}));

/**** Routes pour voir les pages du site ****/

function is_authenticated (req, res, next){
  if(req.session.id != undefined){
    next();
  }else{
    res.status(401).send('Authentification Required! You need to log in or sign up first.');
  }
}

app.get('/home.html',is_authenticated, (req, res) => {
  res.render('home.html');
});

app.get('/index.html', (req, res) => {
  req.session = null;
  res.render('index.html');
});

app.post('/login', (req, res) => {
    if (model.login(req.body.username, req.body.password) != -1){
        req.session.id = model.login(req.body.username, req.body.password);
        req.session.name = req.body.username;
        res.redirect('home.html');
    } else{
        res.render('index.html');
    }
});


app.get('/', (req, res) => {
    if (req.session.id != undefined){
      res.locals.authenticated = true;
      res.locals.name = req.session.name;
    } else{
      res.locals.authenticated = false;
    }
    res.render('index.html');
});

app.get('/domains/domains.html',is_authenticated, (req,res)=>{
  res.render('domains/domains.html')
})

app.get('/domains/domains.html',is_authenticated, (req,res)=>{
  res.render('domains/domains.html')
})


app.get('/sports/sports.html',is_authenticated, (req,res)=>{
  res.render('sports/sports.html')
})


app.get('/tech/tech.html',is_authenticated, (req,res)=>{
  res.render('tech/tech.html')
})


app.get('/science/science.html',is_authenticated, (req,res)=>{
  res.render('science/science.html')
})


app.get('/geography/geography.html',is_authenticated, (req,res)=>{
  res.render('geography/geography.html')
})


app.get('/maths/maths.html',is_authenticated, (req,res)=>{
  res.render('maths/maths.html')
})


app.get('/music/music.html',is_authenticated, (req,res)=>{
  res.render('music/music.html')
})


app.get('/logout', (req, res) => {
  req.session = null;
  req.session = null;
  res.redirect('/');
});

app.post('/signup', (req, res) => {
  req.session.id = model.new_user(req.body.newemail, req.body.newusername, req.body.newpassword);
  if(req.session.id != -1){
    req.session.name = req.body.newusername;
    res.render('home.html');
  }
  else{
    alert("This account already exists!");
    res.render('index.html');
  }

});

app.listen(3000, () => console.log('listening on http://localhost:3000'));

