import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk3"

const USER_PATH = "/home/offlinebot"

let icon = (icon_path: string, css: string) => {
    return new Widget.Icon({
        icon: USER_PATH + icon_path,
        css: css,
    });
}

const btn = (name: string, command: string, relative_icon_path: string) => {
    return <button
        className={`btn-box btn-${name}`}
        onClick={command}>
            {icon(relative_icon_path, "font-size: 140px;")}
    </button>
}


export default function Logout(gdkmonitor: number) {
    return <window
        name={`logout-${gdkmonitor}`}
        visible={false}
        className="Logout"
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.ON_DEMAND} 
        monitor={gdkmonitor}
        onKeyPressEvent={(self, event: Gdk.Event) => {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }}
        application={App}>
        <centerbox>
            <box>
                {btn("Logout", "hyprctl dispatch exit", "/.config/ags/icons/light/logout.png")}
            </box>
            <box>
                {btn("Shutdown", "systemctl poweroff", "/.config/ags/icons/light/shutdown.png")}
            </box>
            <box>
                {btn("Reboot", "reboot", "/.config/ags/icons/light/reboot.png")}
            </box>
        </centerbox>
    </window>
}
