#!/usr/bin/env node

const WebSocket = require("ws");
const readline = require("readline");
const yargs = require("yargs");

const args = yargs
  .command("send [msg]", "send a single message and exit")
  .option("host", {
    default: "norns.local",
    describe: "norns hostname, defaults to norns.local",
    type: "string",
  })
  .help().argv;

const ws = new WebSocket(`ws://${args.host}:5555/`, ["bus.sp.nanomsg.org"], {
  handshakeTimeout: 1000,
});

console.log(`Connecting to ${args.host}...`);

ws.on("open", () => {
  console.log("Connected!");

  // if we have a `send [msg]` then send it and quit
  if (args.msg) {
    ws.send(`${args.msg}\n`);
    process.exit(0);
  }

  // otherwise start readline session
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "maiden> ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    ws.send(`${line}\n`);
  });

  ws.on("message", (data) => {
    console.log(data.toString().trim());
    rl.prompt();
  });
});

ws.on("error", (e) => {
  console.log(e.toString());
});

ws.on("close", () => {
  console.log("Connection closed, exiting...");
});
