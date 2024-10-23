const http = require("http");
const WebSocket = require("ws");

const app = require("./app");
const { initWebSocketServer } = require("./webSocket");

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Initializing the WebSocket
initWebSocketServer(server);

// Start the server

server.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
