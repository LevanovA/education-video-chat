const express = require("express");
const app = express();
const http = require("http");
// const { default: socket } = require("../client/src/Socket");
const server = http.createServer(app);
const PORT = 5000;
const ACTIOON = require("./actions");
const { version, validate } = require("uuid");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

function getClientRooms() {
  const { rooms } = io.sockets.adapter;

  return Array.from(rooms.keys()).filter(
    (roomID) => validate(roomID) && version(roomID) === 4
  );
}

function shareRoomsInfo() {
  io.emit(ACTIOON.SHARE_ROOMS, {
    rooms: getClientRooms(),
  });
}

io.on("connection", (socket) => {
  shareRoomsInfo();

  socket.on(ACTIOON.JOIN, (config) => {
    const { room: roomID } = config;
    const { rooms: joinedRooms } = socket;

    if (Array.from(joinedRooms).includes(roomID)) {
      return console.warn(`Already joined to ${roomID}`);
    }

    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    clients.forEach((clientID) => {
      io.to(clientID).emit(ACTIOON.ADD_PEER, {
        peerID: socket.id,
        createOffer: false,
      });

      socket.emit(ACTIOON.ADD_PEER, {
        peerID: socket.id,
        createOffer: true,
      });
    });

    shareRoomsInfo();
  });

  function leaveRoom() {
    const { rooms } = socket;

    Array.from(rooms).forEach((roomID) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

      clients.forEach((clientID) => {
        io.to(clientID).emit(ACTIOON.REMOVE_PEER, {
          peerID: socket.id,
        });

        socket.emit(ACTIOON.REMOVE_PEER, {
          peerID: clientID,
        });
      });

      socket.leave(roomID);
    });

    shareRoomsInfo();
  }

  socket.on(ACTIOON.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);
});

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
