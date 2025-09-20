require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createioserver } = require('./controllers/socket');

const mongoose = require("mongoose");
const cook = require('cookie-parser');
//const { MongoClient, ServerApiVersion } = require('mongodb');

const http = require('http');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = createioserver(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cook());
app.use(
    cors({
     // origin: "http://localhost:5173", // Replace with your frontend URL
      origin: process.env.CLIENT_URL,
      credentials: true, // Allow credentials (cookies, authorization headers)
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // List all methods explicitly
      allowedHeaders: ["Content-Type", "Authorization"], // Optional: Add allowed headers
    })
  );

app.use('/', require('./routers/userroutes'));

mongoose.connect(`${process.env.dbhost}`).then((res) => { //database creation using connect /myzoomdatabase
    console.log("Connected to the database ", res.connection.host);
}
).catch((err) => {
    console.log("Error connecting to the database", err);
}
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});