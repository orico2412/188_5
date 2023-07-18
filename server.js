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

app.all('/foodTable', CRUD.createFoodTable);

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
});
res.redirect('/login');
});


app.get('/calorieCalculator', (req,res)=>{
res.sendFile(path.join(__dirname, "views/calorieCalculator.html"));
});

app.get('/foodOptions', CRUD.getAllFoods);

app.get('/foodTable/:name', CRUD.getFoodInfo);

app.get('/mainPage', (req,res)=>{
res.redirect('/');
});

app.all('/drop',CRUD.dropAllTables);

app.post('/formLogin', (req, res) => {
    console.log(req.body);
    const { emailInput, passwordInput } = req.body;
    console.log(emailInput, passwordInput);
    CRUD.validateUser(emailInput, passwordInput, (err, userExists) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error checking user');
        return;
      }
      
      if(userExists) {
        res.sendFile(path.join(__dirname, "views/bmrPage.html"));
    } else {
        res.status(401).send(`
        <html>
            <body>
                <script>
                    alert("User doesn't exist!");
                    setTimeout(function(){
                        window.location.href = "/login";
                    }, 700);
                </script>
            </body>
        </html>
    `);
    
    }
      
    });
});
//set up listen
app.listen(port, ()=>{
console.log("server is running on port", port);
});