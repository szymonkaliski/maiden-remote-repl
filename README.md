# `maiden-remote-repl`

Remote REPL session for [Norns Maiden](https://monome.org/docs/norns/maiden/).

# Installation

```
npm install -g marden-remote-repl
```

# Usage

- `maiden-remote-repl` starts the remote repl, user input is sent to Norns, and messages are sent back to the CLI
- `maiden-remote-repl send [msg]` sends `msg` as a one-off, useful for reloading script: `'maiden-remote-repl send "norns.script.load("code/APP/APP.lua")'`

## Tips

You can combine `maiden-remote-repl send` with `nodemon` and `rsync` to get live-reload experience:

1. create a `dev-sync.sh` (assuming you're working on `APP.lua`):
  ```bash
  rsync -azP . --exclude .git --delete we@norns.local:/home/we/dust/code/APP
  maiden-remote-repl send 'norns.script.load("code/APP/APP.lua")'
  ```
2. start file watching session, for example: `nodemon -e lua -x ./dev-sync.sh`

Now, on every file change to lua the code is sent to Norns, and the script is restarted.

