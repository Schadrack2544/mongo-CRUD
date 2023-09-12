//const express=require('express');
import express from "express";
import bodyParser from "body-parser";
//import Routing from "./routes/index";
import {connection,Post } from "./routes/index.mjs";
import { ObjectId } from "mongodb";
//import {PORT}  from ".env";


const app = express();
//app.use('view engine','ejs');
//app.use(routes);
app.use(bodyParser.urlencoded({ extended: true }));
//initiating the connection

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to mongodb: " + err);
  }
})
.then(() => {
  console.log("Connection established");
});

//Database as school and table students


const port = process.env.PORT || 3002;

//adding student in the database
//const entry = { name: "San Marino", age: 17 };
app.post("/", (req, res) => {
  //code logic for creating a Post
  const { name, age } = req.body;
  //Create operation

  Post.insertOne({ name, age })
    .then((result) => {
      console.log("new Post has been added: " + result);
      res.send({ message: "user added successfully", data: result });
    })
    .catch((err) => {
      console.log("An error occurred: " + err);
      res.send({ error: "An error occurred" + err });
    });
});

//Retrieving students from database
app.get("/",  (req, res) => {
  //code logic for retrieving the Posts from the database
  // code logic for retrieving one Post
  // Retriveing data from the database

  Post.find()
    .toArray()
    .then((result) => {
      console.log("Found Post:", result);
      res.send({ message: result.length+ " Posts have been found", data: result });
      //res.render('index.html', {result});
    })
    .catch((error) => {
      console.error("Error reading document:", error);
      res.send({ error: "sorry an error occured" + error });
    });
});

//Retrieving one student from database with an id
app.get("/:id", (req, res) => {
  // code logic for retrieving one Post
  // Retriveing data from the database
  const id = req.params.id;
  const objectId = new ObjectId(id);

  Post.findOne({ _id: objectId })
    .then((result) => {
      console.log("Found Post:", result);

      res.send({ message: "Found Post with this id: " + id, data: result });
      res.render('index.html', {result});
    })
    .catch((err) => {
      console.error("Error reading document:", err);
      res.send({ error: " Could not find Post with this id" + err });
    });
});

//Updating students from database the database with an id
app.patch("/:id", (req, res) => {
  // Updating data in the database
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const { name, age } = req.body;

  Post.updateOne({ _id: objectId }, { $set: { age, name } })
    .then((result) => {
      console.log("Successfully updated" + result);
      res.send({ message: "Post updated successfully!", data: result });
    })
    .catch((error) => {
      console.log("Sorry an error occured" + error);
      res.send({ error: "Sorry an error occured" + error });
    });
});
//deleting a specific student
app.delete("/:id",  (req, res) => {
  // code logic for deleting a specific Post
  const id = req.params.id;
  const objectId = new ObjectId(id);
  //delete data in the database
  Post.deleteOne({ _id: objectId })
    .then((result) => {
      console.log("Successfully deleted " + result);
      res.send({ "message ": "successfully deleted", data: result });
    })
    .catch((error) => {
      res.send({ error: "Sorry an error has occured" + error });
    });
});
//connection.close();
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
