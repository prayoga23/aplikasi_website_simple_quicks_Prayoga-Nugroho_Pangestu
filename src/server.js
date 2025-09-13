const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dummy data for Messaging
const messages = [
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'How are you?' }
];

// Dummy data for To Do List
const todos = [
    { id: 1, task: 'Buy groceries', completed: false },
    { id: 2, task: 'Read a book', completed: true }
];

// API endpoint for getting messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// API endpoint for getting todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// API endpoint for adding a new message
app.post('/api/messages', (req, res) => {
    const newMessage = { id: messages.length + 1, text: req.body.text };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

// API endpoint for adding a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = { id: todos.length + 1, task: req.body.task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
