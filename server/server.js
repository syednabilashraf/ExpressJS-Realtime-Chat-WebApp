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

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname+'/../public');



// app.set('views', path.join(__dirname, '/../public'));
// app.set('view engine', 'hbs');

app.use(express.static(publicPath))


app.get('/',(req,res)=>{
    res.render(publicPath+'/index')
    
    
})


io.on('connection',(socket)=>{
    
    socket.on('joinUsername',function(username){
        socket.emit('newMessage',generateMessage("Admin",`Welcome ${username}!`))
        socket.broadcast.emit('newMessage', generateMessage("Admin", `${username} joined.`))
        socket.broadcast.emit('updatePeople',username)  

    })
    // socket.emit('newMessage',generateMessage("Admin","Welcome! "))
    
    // socket.broadcast.emit('newMessage', generateMessage("Admin","New User joined"))

    
    
    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })

    socket.on('createMessage', function(message,callback){
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback()
    })

    socket.on('showGeolocation', function(geolocation){
        io.emit('showGeolocation',generateLocationMessage("Admin",geolocation))
    })
   
    
})



server.listen(port)