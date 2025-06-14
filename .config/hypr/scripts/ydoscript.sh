#!/bin/bash
set -e

export YDOTOOL_SOCKET="$HOME/.ydotool_socket"

# Press Ctrl + Shift + u
ydotool key 29:1 42:1 22:1
sleep 0.05
# Release Ctrl + Shift + u
ydotool key 22:0 42:0 29:0

sleep 0.1

# Type "00D6"
ydotool type "00D6"

sleep 0.1

# Press Enter
ydotool key 28:1
sleep 0.05
ydotool key 28:0
