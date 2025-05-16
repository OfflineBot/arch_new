
#!/bin/bash

install_package() {
    local package="$1"

    if pacman -Ss "^${package}$" | grep -qE "^(core|extra|community)/${package}"; then
        echo "Installing $package with pacman..."
        sudo pacman -S --noconfirm "$package"
    else
        echo "$package not found in official repos, installing with yay..."
        yay -S --noconfirm "$package"
    fi
}

# Requires jq installed
packages=$(jq -r '.[]' packages.json)

for pkg in $packages; do
    install_package "$pkg"
done
