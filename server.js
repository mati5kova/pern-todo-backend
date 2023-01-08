const express = require('express');
const app = express();
const pool = require('./db.js');
const dotenv = require('dotenv');
dotenv.config();
const corsOptions = require('./config/corsOptions.js');
const cors = require('cors');
//middleware
app.use(cors(corsOptions));
app.use(express.json());

//ROUTES
//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id=$1', [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
        res.json(`Item with id=${id} was updated`);
    } catch (error) {
        console.error(error.message);
    }
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id=$1', [id]);
        res.json(`Item with id=${id} was deleted`);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port 5000');
});
