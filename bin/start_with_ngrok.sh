#!/bin/bash
set -e

# Start ngrok in the background
ngrok http 3000 > /dev/null 2>&1 &
NGROK_PID=$!

cleanup() {
  if ps -p $NGROK_PID > /dev/null; then
    echo "🛑 Stopping ngrok (PID: $NGROK_PID)"
    kill $NGROK_PID
  fi
}
trap cleanup EXIT

# Wait for ngrok to actually expose a tunnel
echo "⏳ Waiting for ngrok tunnel..."
for i in {1..10}; do
  if curl -s http://127.0.0.1:4040/api/tunnels | grep -q "https://"; then
    echo "✅ Ngrok tunnel detected."
    break
  fi
  if [ "$i" -eq 10 ]; then
    echo "❌ Ngrok tunnel did not start."
    exit 1
  fi
  sleep 1
done

# Update local_env.yml now that ngrok is ready
bin/rails ngrok:update_url

# Start Rails server
bin/rails server
