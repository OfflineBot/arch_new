
export function screenshot() {
    return <box className="middle-screenshot middle-box" vertical>
        <button 
            className="middle-screenshot-save middle-screen-btn"
            onClick={["bash", "-c", `ags toggle 'center_box' && grim -g "$(slurp)" ~/Pictures/screenshots/screenshot_$(date +%F_%T).png`]}>
            <label label="Screen" />
        </button>
        <button 
            className="middle-screen-clipboard middle-screen-btn"
            onClick={["bash", "-c", 'ags toggle "center_box" && grim -g "$(slurp)" - | wl-copy']}>
            <label label="Clip" />
        </button>
        <button 
            className="middle-screen-folder middle-screen-btn"
            onClick={["bash", "-c", "kitty ~/Pictures/screenshots"]}>
            <label label="Folder" />
        </button>
        <button 
            className="middle-screen-edit middle-screen-btn"
            onClick={["bash", "-c", "kitty ~/Pictures/screenshots"]}>
            <label label="Edit" />
        </button>
    </box>
}

