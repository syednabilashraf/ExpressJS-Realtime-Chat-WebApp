// https://www.google.com/maps?q=23.7825851%2C90.4278228
const generateLocationMessage = (from , geolocation)=>{
    return {
        from,
        url: `https://www.google.com/maps?q=${geolocation.latitude},${geolocation.longitude}`,
        createdAt:new Date().getTime()   
    }
}
module.exports = {generateLocationMessage}