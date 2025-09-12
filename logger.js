const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("log", { id: 1, url: "http://google.com" });
  }
}

module.exports = Logger;
