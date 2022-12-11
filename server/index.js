const e = require('express');
const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss()

const PORT = process.env.PORT || 5000;

const broadcastConnection = (ws, msg) => {
  console.log(msg)
  
  aWss.clients.forEach(client => {
    if(client.id === msg.id) {
      client.send(`user is join, ${msg.name}`)
    }
  })
}

const connectHandler = (ws, msg) => {
  ws.id = msg.id;
  console.log(msg)
  broadcastConnection(ws, msg)
};


app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case 'connect' : 
        connectHandler(ws, msg)
        break
    }
  })
})

app.listen(PORT, () =>  console.log(`server started on PORT ${PORT}`))
