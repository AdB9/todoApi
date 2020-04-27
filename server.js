const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/',function(req,res){
    res.send('TODO api root');
})

app.listen(PORT, function(){
console.log('Listening on Port: '+ PORT);
})