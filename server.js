const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
var todos = [{
    id:1,
    description: 'Meet mom for lunch',
    completed: false
},
{
    id:2,
    description: 'Go to market',
    completed: false
}]

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

app.listen(PORT, function(){
console.log('Listening on Port: '+ PORT);
})