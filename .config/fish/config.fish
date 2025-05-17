#source /usr/share/cachyos-fish-config/cachyos-config.fish

# overwrite greeting
# potentially disabling fastfetch
#function fish_greeting
#    # smth smth
#end

set -Ux TERMINAL alacritty
set -x GOPROXY direct

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
	string join '' -- (set_color magenta) (prompt_pwd) $stat ' > ' (set_color normal)
end
