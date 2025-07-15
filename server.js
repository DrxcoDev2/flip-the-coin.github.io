const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(__dirname + "/"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("flip", () => {
        const result = Math.random() < 0.5 ? "heads" : "tails";
        io.emit("result", result);      // Emitimos a todos los clientes conectados
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
