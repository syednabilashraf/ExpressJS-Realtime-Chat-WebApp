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
    const li = jQuery("<li ></li>")
    li.text(`${message.from}: `)
    const a = jQuery("<a target = _blank>My location</a>")
    a.attr('href',`${message.url}`)
    li.append(a)
    jQuery('#allMessages').append(li)

})

jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault();
    const messageTextBox = jQuery('[name=message]')
    socket.emit('createMessage',{
        from: "User",
        text: messageTextBox.val()
    
    },function(){
        messageTextBox.val('')

    })

})

const locationButton = jQuery('#send-location')
locationButton.on('click',function (){
    if(!navigator.geolocation){
        return alert('Browser unsupported')
    }
    locationButton.attr('disabled','disabled')
    locationButton.text('Sending location...')
    

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled')
        locationButton.text('Send location')

        socket.emit('showGeolocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        locationButton.removeAttr('disabled')
        locationButton.text('Send location')

        return alert('Unable to fetch position')
    })
})
