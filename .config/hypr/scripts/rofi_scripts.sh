
#!/bin/bash

# Define the folder where your scripts are stored
#folder="$HOME/Scripts"

folder="$(realpath "$HOME/Scripts")"

# Use Rofi to select a script, only showing filenames
#selected=$(find "$folder" -maxdepth 1 -type f -name "*.sh" -printf "%f\n" | rofi -dmenu -p "Select script")
selected=$(find "$folder" -maxdepth 1 -type f -name "*.sh" -printf "%f\n" | rofi -dmenu -p "Select script" -lines 10 -width 40)

# If a script was selected, run it
if [[ -n "$selected" ]]; then
    bash "$folder/$selected"
fi
