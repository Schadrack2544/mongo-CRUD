import { ObjectId,MongoClient } from "mongodb";


  // mongoclient = mongodb.MongoClient;
 export const connectionString = "mongodb://127.0.0.1:27017/blog";
 export const connection = new MongoClient(connectionString);
 export const Post = connection.db("blog").collection("posts");
  
 export const getAllPosts = (req, res) => {
    //code logic for retrieving the Posts from the database
    // code logic for retrieving one Post
    // Retriveing data from the database

    Post.find()
      .toArray()
      .then((result) => {
        console.log("Found Post:", result);
        res.send({ message: "Posts have been found", data: result });
      })
      .catch((error) => {
        console.error("Error reading document:", error);
        res.send({ error: "sorry an error occured" + error });
      });
  };

  export const getSinglePost = (req, res) => {
    // code logic for retrieving one Post
    // Retriveing data from the database
    const id = req.params.id;
    const objectId = new ObjectId(id);

    Post.findOne({ _id: objectId })
      .then((result) => {
        console.log("Found Post:", result);

        res.send({ message: "Found Post with this id: " + id, data: result });
      })
      .catch((err) => {
        console.error("Error reading document:", err);
        res.send({ error: " Could not find Post with this id" + err });
      });
  };

  export const addPost = (req, res) => {
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
  };

  export const updateSinglePost = (req, res) => {
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
  };

  export const deleteSinglePost = (req, res) => {
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
  };



