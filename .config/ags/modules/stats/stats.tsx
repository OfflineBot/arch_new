import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { exec, Variable } from "astal"
import { time, date } from "../bar/right";


const cpu = Variable("").poll(1000, () => {
    try {
        const out = exec(["bash", "-c", "top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'"]);
        return out+"%";
    } catch (err) {
        return String(err);
    }
});

const ram = Variable("").poll(1000, () => {
    try {
        const out = exec(["bash", "-c", "free | grep Mem | awk '{printf \"%.1f\", $3/$2 * 100.0}'"]);
        return out+"%";
    } catch (err) {
        return String(err);
    }
});

const volume = Variable("").poll(100, () => {
    try {
        const out = exec(["bash", "-c", "amixer get Master | grep -o '[0-9]*%' | head -n 1"]);
        const is_muted = exec(["bash", "-c", "amixer get Master"]);
        return is_muted.includes("[off]") ? `muted[${out}]` : `${out}`
        //return `${out}`;
    } catch (err) {
        return String(err);
    }
});

const disk = Variable("").poll(2000, () => {
    try {
        const out = exec(["bash", "-c", "df -h / | awk 'NR==2 {print $5}'"]);
        return `${out}`;
    } catch (err) {
        return String(err);
    }
});

export const battery = Variable("").poll(2000, () => {
    try {
        // Change the battery path to match your system
        const out = exec(["bash", "-c", "cat /sys/class/power_supply/BAT0/capacity"]);
        return `${out.trim()}%`; // Ensure output is clean
    } catch (err) {
        return String(err);
    }
});

const data_box = (name: string, value: Variable<string>) => {
    return <box
        className={`stats-box-${name} stats-box-item`}
        vertical={false}>
        <label xalign={0} label={name+":"} className={`stat-name stat-${name}`} />
        <label label={value()} className={`stat-value stat-${name}`} />
    </box>;
}


export default function Stats(gdkmonitor: number) {
    return <window
        name={`stats-${gdkmonitor}`}
        visible={false}
        className="Stats"
        exclusivity={Astal.Exclusivity.EXCUSIVE}
        keymode={Astal.Keymode.NONE}
        monitor={gdkmonitor}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        //layer={Astal.Layer.BACKGROUND}
        application={App}>
        <box
            className={"stats-main-box"}
            vertical={true}>
            {data_box("Time", time)}
            {data_box("Date", date)}
            {data_box("CPU", cpu)}
            {data_box("RAM", ram)}
            {data_box("DISK", disk)}
            {data_box("SOUND", volume)}
        </box>
    </window>
}
