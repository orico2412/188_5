const SQL = require('./DB');
const csv = require('csvtojson');
const path = require('path');
const cookie = require('cookie-parser');


const createUsersTable = (req, res) => {
    const Q1 = 'CREATE TABLE IF NOT EXISTS `users` (email VARCHAR(255) PRIMARY KEY NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255)) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    SQL.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log(err);
        return;
      }
  
      console.log('User table created successfully');
      res.redirect('/foodTable');
    });
  };
  


//Create table foods


const createFoodTable = (req, res) => {
    const Q2 = `CREATE TABLE IF NOT EXISTS food (
      name VARCHAR(255) PRIMARY KEY NOT NULL,
      calories INT,
      carbs INT,
      proteins INT,
      fats INT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
  
    SQL.query(Q2, (err, mysqlres) => {
      if (err) {
        console.log(err);
        return;
      }
  
      console.log('Food table created successfully');
      insertDataFoods(req, res); // Call the function to insert food data after creating the table
    });
  };
  
  const insertDataFoods = (req, res) => {
    const csvPath = path.join(__dirname, 'foodType.csv');
    csv()
      .fromFile(csvPath)
      .then((jsonObj) => {
        console.log(jsonObj);
        let errorOccurred = false;
  
        for (let i = 0; i < jsonObj.length; i++) {
          const element = jsonObj[i];
          const foodData = {
            name: element.name,
            calories: element.calories,
            carbs: element.carbs,
            proteins: element.proteins, // Corrected typo
            fats: element.fats,
          };
  
          const Q3 = 'INSERT INTO food SET ?';
          SQL.query(Q3, foodData, (err, result) => {
            if (err) {
              console.log(err);
              console.log('Food data:', foodData);
              errorOccurred = true;
            }
          });
  
          if (errorOccurred) {
            break; // Exit the loop if an error occurred
          }
        }
  
        if (errorOccurred) {
          res.status(500).send('Error inserting data into table');
        } else {
          console.log('Data inserted into food table');
          res.redirect('/login'); // Redirect the response only once after completing the loop
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error reading CSV file');
      });
  };
  
    
  




const createNewUser = (email, nameUser, password, res) => {
const newUser = {
    email,
    username: nameUser,
    password
};




// run insert query
const Q3 = "INSERT INTO users SET ?";
SQL.query(Q3, newUser, (err, mysqlres) => {
    if (err) {
        console.log(err);
        console.log("something went wrong");
        return;
    }

    console.log("details entered");
});
};



const getAllFoods = (req, res) => {
    const Q11 = 'SELECT name FROM food';
  
    SQL.query(Q11, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving food options');
        return;
      }
  
      const foodNames = results.map((row) => row.name);
      res.json(foodNames);
    });
  };
  

  const getFoodInfo = (req, res) => {
    const foodName = req.params.name;
    const Q12 = 'SELECT * FROM food WHERE name = ?';
  
    SQL.query(Q12, [foodName], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving food information');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('Food not found');
        return;
      }
  
      const foodInfo = results[0];
      res.json(foodInfo);
    });
  };

  


  const checkUserExists = (email, callback) => {
    const Q6 = "SELECT EXISTS (SELECT 1 FROM users WHERE email = ?) AS userExists";
    SQL.query(Q6, [email], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        const userExists = results[0].userExists === 1;
        callback(null, userExists);
    });
    };





    const validateUser = (email, password, callback) => {
      // Check database connection by fetching a single user
      SQL.query('SELECT * FROM users LIMIT 1', (err, results) => {
          if (err) {
              console.log('Database query check failed: ', err);
              callback(err, null);
              return;
          }
          console.log('Database query check passed, first user: ', results[0]);
      });
  
      // Proceed with original function
      const Q5 = "SELECT EXISTS (SELECT 1 FROM users WHERE email = ? AND password = ?) AS userExists";
      console.log('Starting query');
      SQL.query(Q5, [email, password], (err, results) => {
          if (err) {
              console.log('There was an error with the query: ', err);
              callback(err, null);
              return;
          }
          console.log('Query results: ', results);
          const userExists = results[0]?.userExists === 1;
          console.log('User exists: ', userExists);
          callback(null, userExists);
      });
  };




  const dropAllTables = (req, res) => {
    const Q1 = 'DROP TABLE IF EXISTS `users`;';
    const Q2 = 'DROP TABLE IF EXISTS `food`;';
  
    SQL.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error dropping users table');
        return;
      }
  
      SQL.query(Q2, (err, mysqlres) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error dropping food table');
          return;
        }
  
        res.send('Tables dropped successfully');
      });
    });
  };
  
module.exports = {validateUser, checkUserExists, createUsersTable, createNewUser, dropAllTables, insertDataFoods, createFoodTable, getAllFoods, getFoodInfo};