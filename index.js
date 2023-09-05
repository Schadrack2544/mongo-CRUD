//const express=require('express');
import express from 'express';
import mongodb from 'mongodb';

const mongoclient=mongodb.MongoClient;
const connectionString='mongodb://127.0.0.1:27017/school';
//initiating the connection
const connection=new mongoclient(connectionString);

connection.connect((err)=>{
    if(err){
console.log("Error connecting to mongodb: " + err);
    } 

}).then(()=>{
    console.log("Connection established")
});

//Database as school and table students

const student =connection.db('school').collection('students');
//CRUD Operations
//Create operation
const entry={name:"Jack",age:17}

student.insertOne(entry,(err,result)=>{
    if(err){
        console.log("An error occurred: " + err)
        return;
    }
    console.log("new student has been added: " + result);
});

// Retriveing data from the database
student.findOne({name:"Jack"},(err,result)=>{
    if (err) {
        console.error('Error reading document:', err);
        return;
      }
      console.log('Found student:', result);
})

// Updating data in the database

student.updateOne({name: 'Jack'},{$set:{age:21}},(err,result)=>{
   if(err){
    console.log("Sorry an error occured"+err);
   }
   console.log("Successfully updated"+result);
});

//delete data in the database
student.deleteOne({name: 'Jack'},(err,result)=>{
    if(err){
        console.log("Sorry an error occured"+err);
       }
       console.log("Successfully deleted "+result);
});

connection.close();








const app=express();
const port =4000;

// app.get('/', (req, res) => {
//        res.send('<h1 style="color:red">Welcome to the new world</h1>');
// });

// app.get('/about', (req, res) => {
//     res.send('<h3>We are good students liking to study</h3>');
// });

// app.get('/services', (req, res) => {
//     res.send('<h3>Offering good learning materials</h3>');
// });



app.listen(port,()=>{
    console.log("Server listening on port "+port)
});