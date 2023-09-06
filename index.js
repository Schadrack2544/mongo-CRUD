//const express=require('express');
import express from "express";
import mongodb from "mongodb";

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
connection.close();

const app = express();
const port = 4000;

//adding student in the database
app.post("/", (req, res) => {
  //code logic for creating a student

  //Create operation
  const entry = { name: "Jack", age: 17 };
  student.insertOne(entry, (err, result) => {
    if (err) {
      console.log("An error occurred: " + err);
      res.send({"error":"An error occurred"+err})
      return;
    }
    console.log("new student has been added: " + result);
    res.send({"message": "user added successfully"});
  });
});

//Retrieving students from database
app.get("/", (req, res) => {
  //code logic for retrieving the students from the database
    // code logic for retrieving one student
  // Retriveing data from the database
student.find({ name: "Jack" }, (err, result) => {
  if (err) {
    console.error("Error reading document:", err);
    res.send({"error":"sorry an error occured"+err});
    return;
  }
  console.log("Found student:", result);
  res.send({"message":"Students have been found"});
});

//Retrieving one student from database with an id
app.get("/:id", (req, res) => {
  // code logic for retrieving one student
  // Retriveing data from the database
student.findOne({ name: "Jack" }, (err, result) => {
  if (err) {
    console.error("Error reading document:", err);
    res.send({"error":" Could not find student with this id"+err})
    return;
  }
  console.log("Found student:", result);
  res.send({"message":"Found student with this id"});
});

});

//Updating students from database the database with an id
app.patch("/:id", (req, res) => {
  // Updating data in the database

student.updateOne({ name: "Jack" }, { $set: { age: 21 } }, (err, result) => {
  if (err) {
    console.log("Sorry an error occured" + err);
    res.send({"error":"Sorry an error occured" + err});
  }
  console.log("Successfully updated" + result);
  res.send({"message":"Student updated successfully!"});
});
});
//deleting a specific student
app.delete("/:id", (req, res) => {
  // code logic for deleting a specific student

  //delete data in the database
student.deleteOne({ name: "Jack" }, (err, result) => {
  if (err) {
    console.log("Sorry an error occured" + err);
    res.send({"error":"Sorry an error has occured" + err})
  }
  console.log("Successfully deleted " + result);
  res.send({"message ":"successfully deleted"});
});

});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
