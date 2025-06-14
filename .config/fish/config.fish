#source /usr/share/cachyos-fish-config/cachyos-config.fish

# overwrite greeting
# potentially disabling fastfetch
#function fish_greeting
#    # smth smth
#end

set -Ux TERMINAL alacritty
set -x GOPROXY direct
set -Ux fish_user_paths $HOME/.nix-profile/bin $fish_user_paths
set -ga fish_user_paths /home/offlinebot/.nimble/bin
set -x YDOTOOL_SOCKET $HOME/.ydotool_socket
set -x XCOMPOSEFILE $HOME/.XCompose


function cff
    clear
    fastfetch
end

function prompt_pwd
	echo (string replace --regex "^$HOME" "~" (pwd))
end

function fish_prompt
	set -l last_status $status

	set -l stat
	if test $last_status -ne 0
		set stat (set_color red)"[$last_status]" (set_color normal)
	end
    string join '' -- (set_color --bold white) (prompt_pwd) $stat ' > ' (set_color normal)
end

fish_add_path /home/offlinebot/.spicetify

fish_add_path /home/offlinebot/.modular/bin
