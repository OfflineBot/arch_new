import { exec, Variable } from "astal";
import GLib from "gi://GLib"

const HOME = GLib.getenv("HOME")

const gpu = Variable("0.0");
gpu.set("0.0")
gpu.poll(2000, () => {
    try {
        const out = exec(HOME + "/.config/ags/scripts/gpu.sh")
        return String(parseFloat(out) / 100.0);
    } catch (err) {
        print(err)
        return String(1.0);
    }
});

const cpu = Variable("0.0");
cpu.set("0.0")
cpu.poll(2000, () => {
    try {
        const out = exec(HOME + "/.config/ags/scripts/cpu.sh")
        return String(parseFloat(out) / 100.0);
    } catch (err) {
        print(err)
        return String(1.0);
    }
});

const ram = Variable("0.0")
ram.set("0.0")
ram.poll(2000, () => {
    try {
        const out = exec(["bash", "-c", "free | grep Mem | awk '{print $3/$2}'"]);
        return out;
    } catch (err) {
        return String(1.0);
    }
});

const disk = Variable("0.0");
disk.set("0.0")
disk.poll(2000, () => {
    try {
        const out = exec(["bash", "-c", "df / | awk 'NR==2 {print $5}' | tr -d '%'"]);
        return String(parseFloat(out) / 100.0);
    } catch (err) {
        return String(1.0);
    }
});



function circle_box(name: string, poll: Variable<string>) {
    return <box className={`circle-box`}>
    <overlay>
        <circularprogress startAt={0.0} endAt={1.0} value={poll()} className={`middle-circle middle-circle-${name}`}/>
        <label label={name} css={"color: white;"} />
    </overlay>
</box>
}


export function stats() {
    return <box 
        vertical 
        className="middle-stats middle-box" 
        hexpand
        vexpand>
            {circle_box("CPU", cpu)}
            {circle_box("GPU", gpu)}
            {circle_box("RAM", ram)}
            {circle_box("DISK", disk)}
    </box>
}

