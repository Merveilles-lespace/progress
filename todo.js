const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(express.json());

// MongoDB connection


// Define Todo Schema and Model
const todoSchema = new mongoose.Schema({
    text: String,
    priority:String,
    progress:String
});

const Todo = mongoose.model('Todo', todoSchema);

// GET method
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// POST method
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        priority: req.body.priority,
        progress: req.body.progress
    });
    await newTodo.save();
    res.json(newTodo);
});

// PUT method (update)
app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Task updated", todo: updatedTodo });
});

// DELETE method
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/todos`);
});

module.exports = app;
