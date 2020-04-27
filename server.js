const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const app = express();
const PORT = process.env.PORT || 3001;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/todos', function (req, res) {
    var queryParams = req.query;
    var filteredTodos = todos;

    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
        filteredTodos = _.where(filteredTodos, {completed: true})
    }else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
        filteredTodos = _.where(filteredTodos, {completed: false})
    }else if((queryParams.hasOwnProperty('completed')))
        res.status(400).send();

        if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
           filteredTodos = _.filter(filteredTodos, function(todo){
               return todo.description.toLowerCase().indexOf(queryParams.q) > -1;
           })
        }
    
    res.json(filteredTodos)
})

app.get('/todo/:id', function (req, res) {
    let todoId = parseInt(req.params.id, 10);
    let matchedTodo = _.findWhere(todos, { id: todoId });

    if (matchedTodo)
        res.json(matchedTodo)
    else
        res.status(404).send('No match found for id')
})

app.post('/todo', function (req, res) {
    var body = req.body;
    body = _.pick(body, 'description', 'completed')
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0)
        return res.status(400).send();

    body.description = body.description.trim();
    body.id = todoNextId++;
    // Object.assign(body,{id: todoNextId})
    todos.push(body)

    res.json(body);
})

app.delete('/deleteTodo/:id', function (req, res) {
    let todoId = parseInt(req.params.id, 10);
    let matchedTodo = _.findWhere(todos, { id: todoId });

    if (matchedTodo) {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
    else
        res.status(404).json({ "error": "No match found for id" })

})

app.put('/updateTodo/:id', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    let todoId = parseInt(req.params.id, 10);
    let matchedTodo = _.findWhere(todos, { id: todoId });

    if (!matchedTodo)
        return res.status(404).send();

    var validAttributes = {};

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;

    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes)
    res.json(matchedTodo);
})

app.listen(PORT, function () {
    console.log('Listening on Port: ' + PORT);
})