
#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <search-string>"
    exit 1
fi

search="$1"
selected_packages=()

# Get all installed packages matching the search string
packages=$(pacman -Q | awk -v s="$search" '$1 ~ s { print $1 }')

for pkg in $packages; do
    read -r -p "Add package '$pkg'? (y/n) " answer
    case "$answer" in
        [Yy]* ) selected_packages+=("$pkg") ;;
        * ) ;;
    esac
done

if [ ${#selected_packages[@]} -eq 0 ]; then
    echo "No packages selected."
    exit 0
fi

# Check if packages.json exists and is valid JSON array
if [[ -f packages.json ]]; then
    if ! jq empty packages.json >/dev/null 2>&1; then
        echo "packages.json is not valid JSON, backing up and starting fresh."
        mv packages.json packages.json.bak
        echo "[]" > packages.json
    fi
else
    echo "[]" > packages.json
fi

# Read existing packages from JSON file
existing_packages=$(jq -r '.[]' packages.json)

# Combine existing and new packages, avoid duplicates
combined_packages=$(printf "%s\n%s\n" "$existing_packages" "${selected_packages[@]}" | sort -u)

# Convert combined list to JSON array
json=$(printf '%s\n' $combined_packages | jq -R . | jq -s .)

# Save to packages.json
echo "$json" > packages.json
echo "Added selected packages to packages.json"
