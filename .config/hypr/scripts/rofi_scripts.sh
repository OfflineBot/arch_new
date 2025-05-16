
#!/bin/bash

# Define the folder where your scripts are stored
folder="$HOME/Scripts"

# Use Rofi to select a script, only showing filenames
selected=$(find "$folder" -maxdepth 1 -type f -name "*.sh" -printf "%f\n" | rofi -dmenu -p "Select script")

# If a script was selected, run it
if [[ -n "$selected" ]]; then
    bash "$folder/$selected"
fi
