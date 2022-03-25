const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
console.log(server)

var port = 3331;
// const { Server } = require('socket.io')(server)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost",
        methods: ["GET", "POST"]
      }
});
// (server, {
//     cors: {
//       origin: "http://localhost",
//       methods: ["GET", "POST"]
//     }
// });
// const io = new Server(server);
// // var io = require('socket.io')(server, {
// //     cors: {
// //       origin: "http://localhost",
// //       methods: ["GET", "POST"]
// //     }
// // });


server.listen(port, function(){
    console.log('App running on : ' + port);
})
io.on("connection", function (socket_client) {  
    console.log('=========== oi =====') 
}); 
// venom.create({
//     session: "testeBot", //name of session
//     multidevice: true, // for version not multidevice use false.(default: true)
//     // headless: false // Para abrir uma aba
//   })
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });