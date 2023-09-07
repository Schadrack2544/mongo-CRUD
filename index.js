//const express=require('express');
import express from "express";
import mongodb, { ObjectId } from "mongodb";
import bodyParser from "body-parser";
const mongoclient = mongodb.MongoClient;
const connectionString = "mongodb://127.0.0.1:27017/school";
//initiating the connection
const connection = new mongoclient(connectionString);

connection
  .connect((err) => {
    if (err) {
      console.log("Error connecting to mongodb: " + err);
    }
  })
  .then(() => {
    console.log("Connection established");
  });

//Database as school and table students

const student = connection.db("school").collection("students");
//CRUD Operations

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4000;

//adding student in the database
//const entry = { name: "San Marino", age: 17 };
app.post("/", (req, res) => {
  //code logic for creating a student
  const { name, age } = req.body;
  //Create operation

  student
    .insertOne({ name, age })
    .then((result) => {
      console.log("new student has been added: " + result);
      res.send({ message: "user added successfully", data: result });
    })
    .catch((err) => {
      console.log("An error occurred: " + err);
      res.send({ error: "An error occurred" + err });
    });
});

//Retrieving students from database
app.get("/", (req, res) => {
  //code logic for retrieving the students from the database
  // code logic for retrieving one student
  // Retriveing data from the database

  student
    .find()
    .toArray()
    .then((result) => {
      console.log("Found student:", result);
      res.send({ message: "Students have been found", data: result });
    })
    .catch((error) => {
      console.error("Error reading document:", error);
      res.send({ error: "sorry an error occured" + error });
    });
});

//Retrieving one student from database with an id
app.get("/:id", (req, res) => {
  // code logic for retrieving one student
  // Retriveing data from the database
  const id = req.params.id;
  const objectId = new ObjectId(id);

  student
    .findOne({ _id: objectId })
    .then((result) => {
      console.log("Found student:", result);
      res.send({ message: "Found student with this id: " + id, data: result });
    })
    .catch((err) => {
      console.error("Error reading document:", err);
      res.send({ error: " Could not find student with this id" + err });
    });
});

//Updating students from database the database with an id
app.patch("/:id", (req, res) => {
  // Updating data in the database
  const id = req.params.id;
  const objectId = new ObjectId(id);
  const { name, age } = req.body;
  student
    .updateOne({ _id: objectId }, { $set: { age, name } })
    .then((result) => {
      console.log("Successfully updated" + result);
      res.send({ message: "Student updated successfully!", data: result });
    })
    .catch((error) => {
      console.log("Sorry an error occured" + error);
      res.send({ error: "Sorry an error occured" + error });
    });
});
//deleting a specific student
app.delete("/:id", (req, res) => {
  // code logic for deleting a specific student
  const id = req.params.id;
  const objectId = new ObjectId(id);
  //delete data in the database
  student
    .deleteOne({ _id: objectId })
    .then((result) => {
      console.log("Successfully deleted " + result);
      res.send({ "message ": "successfully deleted", data: result });
    })
    .catch((error) => {
      res.send({ "error": "Sorry an error has occured" + error });
    });
});
//connection.close();
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
