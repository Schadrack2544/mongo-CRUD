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

const app = express();
const port = 4000;

//adding student in the database
const entry = { name: "Jack", age: 17 };
app.post("/", (req, res) => {
  //code logic for creating a student

  //Create operation
 
  student
    .insertOne(entry)
    .then((result) => {
      console.log("new student has been added: " + result);
      res.send({ message: "user added successfully" });
    })
    .catch((err) => {
      console.log("An error occurred: " + err);
      res.send({ error: "An error occurred" + err });
    });

  // student.insertOne(entry, (err, result) => {
  //   if (err) {
  //     console.log("An error occurred: " + err);
  //     res.send({"error":"An error occurred"+err})
  //     return;
  //   }
  //   console.log("new student has been added: " + result);
  //   res.send({"message": "user added successfully"});
  // });
});

//Retrieving students from database
app.get("/", (req, res) => {
  //code logic for retrieving the students from the database
  // code logic for retrieving one student
  // Retriveing data from the database

  student
    .find(entry)
    .toArray()
    .then((result) => {
      console.log("Found student:", result);
      res.send({ message: "Students have been found" });
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

  student
    .findOne({ name: "Jack" })
    .then((result) => {
      console.log("Found student:", result);
      res.send({ message: "Found student with this id" });
    })
    .catch((err) => {
      console.error("Error reading document:", err);
      res.send({ error: " Could not find student with this id" + err });
    });
});

//Updating students from database the database with an id
app.patch("/:name", (req, res) => {
  // Updating data in the database

  student
    .updateOne({ name: "Jack" }, { $set: { age: 21 } })
    .then((result) => {
      console.log("Successfully updated" + result);
      res.send({ message: "Student updated successfully!" });
    })
    .catch((error) => {
      console.log("Sorry an error occured" + error);
      res.send({ error: "Sorry an error occured" + error });
    });

  
});
//deleting a specific student
app.delete("/:name", (req, res) => {
  // code logic for deleting a specific student

  //delete data in the database
  student.deleteOne({name: "student"}).then((result)=>{
    console.log("Successfully deleted " + result);
    res.send({ "message ": "successfully deleted" });
  }).catch((error) => {
    res.send({ "error": "Sorry an error has occured" + error });
  }
  );

});
//connection.close();
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
