import { Gtk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import { Variable } from "astal"

const wk_speed = 10;


const workspaces = Variable<{ [key: string]: string }>({}).poll(wk_speed, () => {
    const hyprland = Hyprland.get_default();
    const workspaces = hyprland.get_workspaces();
    if (workspaces.length === 0) return {};

    const activeId = hyprland.get_focused_workspace().id;
    const focusedClient = hyprland.get_focused_client();
    const windowName = focusedClient?.title ?? "";

    const wkStatus: { [key: string]: string } = {};

    for (const wk of workspaces) {
        wkStatus[wk.name] = (wk.id === activeId) ? "active" : "passive";
    }

    if (windowName) {
        wkStatus[windowName] = "active-window";
    }

    return Object.fromEntries(
        Object.entries(wkStatus).sort(([a], [b]) => a.localeCompare(b))
    );
});

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
