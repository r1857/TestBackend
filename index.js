const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL!");
});

// API Route to Fetch Table Data
app.get("/entries", (req, res) => {
    db.query("SELECT * FROM testCases", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results); // Send table data to frontend
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const app = express();

// app.set("view engine","ejs");

// app.use("/products/:id", function(req, res){
//     res.send("products details" + req.params.id);
    
// });

// app.use("/products", function(req, res){
//     res.send("products");
//     //console.log("products");
// });

// app.use("/", function(req, res){
//     res.send("Ana sayfa");
// });





// app.listen(3000, () => {
//     console.log("Listenning on port 3000");

// });




// var http = require("http"); // node modules => http, fs, os
// var fs = require("fs");

// var server = http.createServer((req, res) => {
//     //console.log(req.url);

//     //res.write("<h1>ana sayfa</h1>");
//     if(req.url == "/"){
//         res.write("<h1>ana sayfa</h1>");

//     } else if(req.url == "/urunler"){
//         res.write("<h1>urunler</h1>")

//     } else {
//         res.write("sayfa bulunamadi")
//     }

//     res.end();

// });

// server.listen(3000, () =>{
//     console.log("nodejs server at port 3000 kaan");
// });