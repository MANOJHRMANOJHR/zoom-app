require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createioserver } = require('./controllers/socket');

//const mongoose = require("mongoose");
const cook = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
     origin: "*",
      credentials: true, // Allow credentials (cookies, authorization headers)
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // List all methods explicitly
      allowedHeaders: ["Content-Type", "Authorization"], // Optional: Add allowed headers
    })
  );

app.use('/', require('./routers/userroutes'));





const uri = process.env.dbhost;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

/*
mongoose.connect(`${process.env.dbhost}`).then((res) => { //database creation using connect /myzoomdatabase
    console.log("Connected to the database ", res.connection.host);
}
).catch((err) => {
    console.log("Error connecting to the database", err);
}
);
*/
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});