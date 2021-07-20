const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname+'/../public');


app.get('/',(req,res)=>{
    res.render(publicPath+'/index')
    
    
})

app.listen(port)