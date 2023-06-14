// import and set up
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//const SQL = require('./DB/DB');
const port = 2023;
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//routing
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/mainPage.html"));
});

app.get('/bmrPage', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/bmrPage.html"));
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

app.post('/formRegister', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/mainPage.html"));
});



//set up listen
app.listen(port, ()=>{
    console.log("server is running on port", port);
});