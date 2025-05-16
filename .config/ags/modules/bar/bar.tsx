import { App, Astal, Gtk, Gdk } from "astal/gtk3"

import { left_side } from "./left"
import { center_side } from "./center"
import { right_side } from "./right"


export default function Bar(gdkmonitor: number) {
    return <window
        name={`Bar-${gdkmonitor}`}
        visible={false}
        className="Bar"
        monitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}>
        <centerbox>
            {left_side()}
            {center_side()}
            {right_side()}
        </centerbox>
    </window>
}
