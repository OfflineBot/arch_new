import { App, Astal } from "astal/gtk3"

import { bottom } from "./bottom"
import { logout } from "./logout"
import { music } from "./music"
import { screenshot } from "./screenshot"
import { sound } from "./sound"
import { stats } from "./stats"
import { time_day } from "./time"



export default function CenterBox() {
    return <window
        name={`center_box`}
        visible={false}
        className="center-box"
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        application={App}>

        <box vertical={true}>
            <box>
                {stats()}
                <box vertical={true}>
                    <box>
                        {time_day()}
                        {screenshot()}
                    </box>
                    <box vertical={false}>
                        {music()}
                        {sound()}
                    </box>
                </box>
                {logout()}
            </box>
        </box>
    </window>
}
