import { App } from "astal/gtk3"
import style from "./style.scss"

import CenterBox from "./modules/center_box/center_box"
import Bar from "./modules/bar/bar"
import Logout from "./modules/logout/logout"
import Stats from "./modules/stats/stats"
import Applauncher from "./modules/applauncher/applauncher"
//import MprisPlayers from "./modules/media_player/media_player"



App.start({
    css: style,
    main() {
        CenterBox()
        Applauncher(0)
        Applauncher(1)
        Applauncher(2)
        Stats()
        Logout()
        Bar(0)
        Bar(1)
        Bar(2)
        //MprisPlayers(0)
    },
})

