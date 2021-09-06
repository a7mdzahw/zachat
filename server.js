"use strict";
exports.__esModule = true;
var express = require("express");
// const socketIo = require("socket.io");
var path = require("path");
var socket_io_1 = require("socket.io");
var app = express();
app.use(express.static(path.resolve("./client/public")));
app.get("/", function (req, res) {
    var index = path.resolve("./client/public/index.html");
    res.sendFile(index);
});
var server = app.listen(8000, function (err) {
    if (err)
        console.log(JSON.stringify(err));
    console.log("on 8000");
});
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    socket.on("message", function (message) {
        socket.broadcast.emit("recieve", message);
    });
});
