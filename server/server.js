const express = require('express');
const path = require('path');
const hbs = require('hbs')
const http = require('http')
const socketIO = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection',(socket)=>{
    
    socket.emit('newMessage',{
        from : "Admin",
        text: "Welcome to the chat App"
    })
    socket.broadcast.emit('newMessage',{
        from : "Admin",
        text: "New User joined"

   
    })
    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })

    socket.on('createMessage', function(message){
        console.log(message)
    })
   
    
})

app.use(express.static('./public'))
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


const port = process.env.PORT || 3000
const publicPath = path.join(__dirname+'/../public');


app.get('/',(req,res)=>{
    res.render(publicPath+'/index')
    
    
})

server.listen(port)