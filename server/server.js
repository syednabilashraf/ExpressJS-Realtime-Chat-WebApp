const express = require('express');
const path = require('path');
const hbs = require('hbs')
const http = require('http')
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
const { generateLocationMessage } = require('./utils/geolocation');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);


io.on('connection',(socket)=>{
    
    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat App"))
    
    socket.broadcast.emit('newMessage', generateMessage("Admin","New User joined"))

    
    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })

    socket.on('createMessage', function(message,callback){
        io.emit('newMessage',generateMessage(message.from,message.text))
    })

    socket.on('showGeolocation', function(geolocation){
        io.emit('showGeolocation',generateLocationMessage("Admin",geolocation))
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