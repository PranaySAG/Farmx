const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);

const io = socketIo(server)
app.get("/",(req,res)=>{
  res.send("Welcome to Farm-BE");
});
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
