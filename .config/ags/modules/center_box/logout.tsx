
import { Widget } from "astal/gtk3"
import GLib from "gi://GLib"

const HOME = GLib.getenv("HOME")

let icon = (icon_path: string, css: string) => {
    return new Widget.Icon({
        icon: HOME + icon_path,
        css: css,
    });
}

const btn = (name: string, command: string, relative_icon_path: string) => {
    return <button
        className={`middle-btn-box middle-btn-${name}`}
        onClick={command}>
            {icon(relative_icon_path, "font-size: 50px;")}
    </button>
}

export function logout() {
    return <box className="middle-logout middle-box" vertical halign="center" valign="center" hexpand vexpand>
        <box>
            {btn("Lock", "hyprlock", "/.config/ags/icons/light/lock.png")}
        </box>
        <box>
            {btn("Logout", "hyprctl dispatch exit", "/.config/ags/icons/light/logout.png")}
        </box>
        <box>
            {btn("Shutdown", "systemctl poweroff", "/.config/ags/icons/light/shutdown.png")}
        </box>
        <box>
            {btn("Reboot", "reboot", "/.config/ags/icons/light/reboot.png")}
        </box>
    </box>
}
