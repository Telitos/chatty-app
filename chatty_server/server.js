// server.js

const express = require('express')
const SocketServer = require('ws').Server
const uuid = require('node-uuid')
const randomColor = require('randomcolor')

// Set the port to 4000
const PORT = 4000

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))

// Create the WebSockets server
const wss = new SocketServer({ server })

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected')

  let color = randomColor()
  let usernameColor = {type: "userData", color: color}

  ws.send(JSON.stringify(usernameColor))

  const broadcast = (message) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(message))
    })
  }

  let usersConnected = wss.clients.length
  let usersNumber = {type: "userData", content: usersConnected}

  broadcast(usersNumber)

  ws.on('message', function incoming(data) {

    const message = JSON.parse(data)
      const id = uuid.v1()
      message["id"] = id
    broadcast(message)
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'))
});