const socket = io();

socket.on('connect',function (){
    console.log('Connected to server')
    })
socket.on('disconnect',function(){
        console.log('Disconnected from server')
    })

socket.on('newMessage',function(message){
    const li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    jQuery('#allMessages').append(li)

})

socket.on('showGeolocation',function(message){
    console.log(message)
    const li = jQuery("<li></li>")
    console.log("first", li )
    li.text(`${message.from}: `)
    console.log("second", li)
    const a = jQuery("<a target = _blank>My location</a>")
    a.attr('href',`${message.url}`)
    li.append(a)
    jQuery('#allMessages').append(li)

})

jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from: "User",
        text: jQuery('[name=message]').val()
    },function(message){
// console.log(message)
    })
})

jQuery('#send-location').on('click',function (){
    if(!navigator.geolocation){
        return alert('Browser unsupported')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('showGeolocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        return alert('Unable to fetch position')
    })
})
