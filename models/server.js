// servidor de express
const express = require("express");
// Servidor de sockets
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // http server
    this.server = http.createServer(this.app);

    //configuracions de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }
  middlewares() {
    // desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }
  configurarSockets(){
    new Sockets(this.io);
  }

  execute() {
    //Inicializar Middlewares
    this.middlewares();
    //inicializar sockets sockets
    this.configurarSockets();
    //Inicialzar el server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
