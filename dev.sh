echo "Starting client and server..\n"

(cd ./server && deno run -A main.ts) &
(cd ./client && pnpm dev) &

# Makes sure that processes is terminated with script
trap 'kill 0; wait; exit 0' SIGINT

wait
