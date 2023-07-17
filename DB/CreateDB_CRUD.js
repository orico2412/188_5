const SQL = require('./DB');
const csv = require('csvtojson');
const path = require('path');
const cookie = require('cookie-parser');


const createUsersTable = (req, res) => {
    const Q1 =
      'CREATE TABLE IF NOT EXISTS `users` (email VARCHAR(255) PRIMARY KEY NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, gender VARCHAR(255), age INT, height DECIMAL(3,2), weight DECIMAL(3,2)) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    SQL.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log(err);
        return;
      }
  
      console.log('User table created successfully');
      res.redirect('/login');
    });
  };
  






// run insert query


// const insertData = (req, res) => {
//     const csvPath = path.join(__dirname, "data.csv");
//     /// this is new
//     csv().fromFile(csvPath).then((jsonObj) => {
//         console.log(jsonObj);
//         for (let i = 0; i < jsonObj.length; i++) {
//             const element = jsonObj[i];
//             console.log(element);
//             const NewCsvData = {
//                 name: element.name,
//                 email: element.email,
//                 password: element.password
//             };

//             const Q2 = "insert into users set ?";
//         sql.query(Q2, NewCsvData, (err, mysqlres) => {
//             if (err) {
//                 throw err
//             }
//             //res.send('Data inserted into table');
//         });
//     }

// });
// res.send("ok");
// };





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




const insertNewDetails = (email, gender, age, activityLevel, height, weight, goal, callback) => {
const Q4 = "UPDATE users SET gender = ?, age = ?, activityLevel = ?, height = ?, weight = ?, goal = ? WHERE email = ?";
SQL.query(Q4, [gender, age, activityLevel, height, weight, goal, email], (err, results) => {
    if (err) {
        callback(err, null);
        return;
    }
    console.log("details entered");
})
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
const Q5 = "SELECT EXISTS (SELECT 1 FROM users WHERE email = ? AND password = ?) AS userExists";
SQL.query(Q5, [email, password], (err, results) => {
    if (err) {
        callback(err, null);
        return;
    }
    const userExists = results[0].userExists === 1;
    callback(null, userExists);
});
};





const dropAllTables = (req, res) => {
const Q10 = 'drop TABLE `users`;';
SQL.query(Q10, (err, mysqlres) => {
    if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
    }
    res.send("hi - table dropped");
    return;
})
};
module.exports = {validateUser, checkUserExists, createUsersTable, createNewUser, insertNewDetails, dropAllTables};