// import and set up
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const sql = require('./DB/DB');
const port = 3000;
const CRUD = require("./DB/CreateDB_CRUD");
const cookie = require("cookie-parser")
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname, "views"));
// app.set('view engine', 'pug');
app.use(cookie());


app.all('/',CRUD.createUsersTable);

//routing
app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/mainPage.html"));
});

app.get('/bmrPage', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/bmrPage.html"));
});

app.post('/formRegister', (req, res) => {
    console.log('Received formRegister request');
    const { email, username, password } = req.body;
    CRUD.createNewUser(email, username, password, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error registering user');
        return;
      }
      // Manually send redirect response
      res.writeHead(302, {
        Location: '/mainPage'
      });
      res.end();
    });
  });


app.get('/calorieCalculator', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/calorieCalculator.html"));
});

app.get('/mainPage', (req,res)=>{
    res.redirect('/');
});

app.post('/formLogin', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/bmrPage.html"));
});

//app.post('/formRegister', CRUD.createUsersTable);

//set up listen
app.listen(port, ()=>{
    console.log("server is running on port", port);
});