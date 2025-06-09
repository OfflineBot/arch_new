import { Variable } from "astal";

const time_poll = Variable("").poll(1000, () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    const s = now.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
});

const date_poll = Variable("").poll(60000, () => {
    const now = new Date();
    const d = now.getDate().toString().padStart(2, "0");
    const mo = (now.getMonth() + 1).toString().padStart(2, "0");
    const y = now.getFullYear();
    return `${d}/${mo}/${y}`;
});

const weekday_poll = Variable("").poll(60000, () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", { weekday: "long" });
});

export function time_day() {
    return <box className="middle-time middle-box" vertical>
        <label label={weekday_poll()} className="weekday" css={"font-family: 'Cybersky Free Trial', monospace; font-size: 80px;"} /> 
        <label label={date_poll()} className="date" css={"font-size: 30px;"} /> 
        <label label={time_poll()} className="time" css={"font-size: 40px; font-weight: bold;"} /> 
    </box>
}

