import { App, Gdk } from "astal/gtk3"
import style from "./style.scss"

import Bar from "./modules/bar/bar"
import Logout from "./modules/logout/logout"
import Stats from "./modules/stats/stats"
import Applauncher from "./modules/applauncher/applauncher"


App.start({
    css: style,
    main() {
        Applauncher(0)
        Applauncher(1)
        Applauncher(2)
        Stats(0)
        Stats(1)
        Stats(2)
        Logout(0)
        Logout(1)
        Logout(2)
        Bar(0)
        Bar(1)
        Bar(2)
    },
})

