const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const app = express();
const PORT = process.env.PORT || 3001;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
app.get('/',function(req,res){
    res.send('TODO api root');
})

app.get('/todos', function(req,res){
    res.json(todos)
})

app.get('/todo/:id', function(req, res){
    let todoId = parseInt(req.params.id,10);
    let matchedTodo = _.findWhere(todos,{id: todoId});

    if(matchedTodo)
    res.json( matchedTodo)
    else
    res.status(404).send('No match found for id')
})

app.post('/todo', function(req,res){
var body = req.body;
body = _.pick(body,'description', 'completed')
if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0)
return res.status(400).send();

body.description = body.description.trim();
body.id = todoNextId++;
// Object.assign(body,{id: todoNextId})
todos.push(body)

res.json(body);
})

app.listen(PORT, function(){
console.log('Listening on Port: '+ PORT);
})