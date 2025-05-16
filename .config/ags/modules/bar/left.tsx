import { App, Astal, Gtk, Gdk } from "astal/gtk3"

import Hyprland from "gi://AstalHyprland"
import { Variable } from "astal"

const wk_speed = 100;

const workspaces = Variable<{ [key: string]: string}>({}).poll(wk_speed, () => {
    const hyprland = Hyprland.get_default()
    const workspaces = hyprland.get_workspaces()
    const active = hyprland.get_focused_workspace().id;
    let window_name = hyprland.get_focused_client()?.title || null;
    if (window_name === null) {
        window_name = "";
    }

    let wk_status: { [key: string]: string } = {};

    workspaces.forEach((wk) => {
        if (wk.id === active) {
            wk_status[wk.name] = "active"
        } else {
            wk_status[wk.name] = "passive"
        }
    })

    const sortedEntries = Object.entries(wk_status).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
    const sortedWkStatus = Object.fromEntries(sortedEntries);
    if (window_name != "") {
        sortedWkStatus[window_name] = "active-window";
    }

    return sortedWkStatus
})

function left_side() {
    return <box halign={Gtk.Align.START} className="bar-workspace bar-item">
        {workspaces().as((v: { [key: string]: string} ) => (
            Object.entries(v).map(([key, value]) => (
                <button
                    className={`wk-btn wk-${value}`}
                    onClick={`hyprctl dispatch "workspace ${key}"`}>
                    <label label={`${key}`} className={`wk-${key} wk-${value} wk-item`} />
                </button>
            ))  
        ))}
    </box>
}

export { left_side }
