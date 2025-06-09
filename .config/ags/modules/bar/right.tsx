import { Gtk } from "astal/gtk3"
import { Variable } from "astal"

export const time = Variable("").poll(1000, () => {
    const rawTime = new Date().toLocaleTimeString([], { hour12: false }); 
    return rawTime.split(" CET")[0]; 
})

export const date = Variable("").poll(1000, () => {
    const rawDate = new Date().toLocaleDateString('en-GB'); 
    return rawDate;
})

const power_of = () => {
    return <button
                className="bar-off bar-item"
                onClick={`ags toggle "logout-0"`}>
        <label label={"\uf011"} className="bar-off-text" /> 
    </button>
}

function right_side() {
    return <box halign={Gtk.Align.END}>
        <label label={time()} className="bar-time bar-item"/>
        <label label={date()} className="bar-date bar-item"/>
        {power_of()}
    </box>
}

export { right_side }

