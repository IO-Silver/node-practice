const EventEmitter = require("events");
const emitter = new EventEmitter();
const Logger = require("./logger");
const logger = new Logger();

logger.on("log", (args) => {
  console.log(`url: ${args.url}`);
});

logger.log("message");
