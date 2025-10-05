/*
    MERN!!!!!!
*/

//imports
import express from 'express';      //web framework
import cors from 'cors';            //lets react connect safely (and other websites apparently)
import mongoose from 'mongoose';    //talks to mongodb
import dotenv from 'dotenv';        //env. variables

import initdb from mongodb.js;      //import connect function from other js file

//setup
dotenv.config();    //load env. vars
const app = express();  //create express app

//middleware
app.use(cors());    //let reacts make requests
app.use(express.json());     //let app use json

//connect to database
initdb();

//define schema
const taskSchema = new mongoose.Schema({
    title: String,
    desc: String,
    dueDate: Date,
    completed: Boolean
}); const Task = mongoose.model("Task", taskSchema);   //create model for tasks...might add more later. start small -> big

//talk to frontend
app.get("/tasks", async (req, res) => {   //get tasks from db at start of app loading
    res.json(await Task.find());  //find task -> send as json...not Task.find() since that doesn't do anything
});

//add task
app.post("/tasks", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        desc: req.body.desc,
        dueDate: req.body.dueDate,
        completed: false
    })

    await task.save();
    res.json(task);
});

//update task
app.put("/tasks/:id", async (req, res) => {
    try {   //try catch
        const task = await Task.findByIdAndUpdate(
            req.params.id,  //find by id
            {
                title: req.body.title,
                desc: req.body.desc,
                dueDate: req.body.dueDate,
                completed: req.body.completed
            }, { new: true }    //return updated task
        )

        if(!task) return res.status(404).send("task not found");    //if no task -> 404

        res.json(task);  //send back updated task
    } catch(err) {  //catch error
        res.status(500).send(err.message);  //send error msg
    }
});

//delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) return res.status(404).send("task not found");

        res.json({ message: "task deleted" });
    } catch(err) {
        res.status(500).send(err.message);
    }
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server on port " + PORT));

