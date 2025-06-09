
import { App, Astal, Gtk, Widget } from "astal/gtk3"
import GLib from "gi://GLib"
import { bind } from "astal"
import Mpris from "gi://AstalMpris"


const HOME = GLib.getenv("HOME")

let icon = (icon_path: string, css: string) => {
    return new Widget.Icon({
        icon: HOME + icon_path,
        css: css,
    });
}

function SoundSlider({ player }: { player: Mpris.Player }) {
    return <box className="" vertical>
        <slider 
            vertical 
            invert={false}
            value={player.volume ?? 0.4} 
            onDragged={({ value }) => player.volume = 1.0 - value}
            className="middle-sound-box" />
        {icon("/.config/ags/icons/light/sound.png", "font-size: 20px;")}
    </box>
}


export function sound() {
    const mpris = Mpris.get_default()

    return <box vertical className="middle-sound middle-box">
        {bind(mpris, "players").as(arr => {
            if (!arr || arr.length === 0) {
                return <label label="No media players available" halign={Gtk.Align.CENTER} />
            }

            const spotifyPlayers = arr.filter(player =>
                player.identity?.toLowerCase().includes("spotify")
            )

            if (spotifyPlayers.length > 0) {
                // Show only Spotify players
                return spotifyPlayers.map(player => (
                    <SoundSlider player={player} />
                ))
            } else {
                // No Spotify found, show all other players
                return arr.map(player => (
                    <SoundSlider player={player} />
                ))
            }
        })}
    </box>
}
