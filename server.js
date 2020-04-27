const express = require('express');
const bodyParser = require('body-parser');
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
    let id = parseInt(req.params.id,10);
    let matchedTodo;
     todos.forEach(todo => {
        if(todo.id === id){
        matchedTodo = todo;
        }
    });
    if(matchedTodo)
    res.json( matchedTodo)
    else
    res.status(404).send('No match found for id')
})

app.post('/todo', function(req,res){
var body = req.body;
body.id = todoNextId++;
// Object.assign(body,{id: todoNextId})
todos.push(body)

res.json(body);
})

app.listen(PORT, function(){
console.log('Listening on Port: '+ PORT);
})