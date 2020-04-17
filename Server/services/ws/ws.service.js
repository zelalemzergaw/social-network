const WS = require('express-ws'),
      jwt = require('jsonwebtoken'),
      WebSocket = require("ws"),
      { User, Post } = require('../../models');

function startWebSocket(app) {
    try {
        WS(app);
    let users = [];
    app.locals.users = users;
    app.ws('/', function(ws, req) {
        console.log("CONNECTDD");
        setTimeout(() => {
            if(ws.readyState == WebSocket.OPEN) {
                if (!ws.userId) ws.close();
            }
            
        }, 45000);

        ws.on('close', function() {
            console.log('The connection is closed');
        });

        ws.on('message', function(message) {
            if(message) {
                let data = JSON.parse(message);
                if(!data.token) ws.close();
                const verified = jwt.verify(data.token, process.env.SECRET_KEY);
                if(!verified) ws.close()
                ws.userId = verified.id;
                users[verified.id] = ws;
                ws.send("You have succesfully connected");
            }
            else {
                ws.close();
            }
            
        })
    });
    } catch(err) {
        console.log(err);
    }
    
   
}

module.exports = startWebSocket