import { App, Astal, Gtk, Widget } from "astal/gtk3"
import Mpris from "gi://AstalMpris"
import { bind } from "astal"
import GLib from "gi://GLib"

function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

const HOME = GLib.getenv("HOME")

let icon = (icon_path: string, css: string) => {
    return new Widget.Icon({
        icon: HOME + icon_path,
        css: css,
    });
}


function MediaPlayer({ player }: { player: Mpris.Player }) {
    const { START, END } = Gtk.Align

    const title = bind(player, "title").as(t =>
        t || "Unknown Track")

    const artist = bind(player, "artist").as(a =>
        a || "Unknown Artist")

    const coverArt = bind(player, "coverArt").as(c =>
        `background-image: url('${c}'); background-size: cover; background-repeat: no-repeat; min-width: 200px; min-height: 200px;`)


    const position = bind(player, "position").as(p => player.length > 0
        ? p / player.length : 0)
    

    const playIcon = bind(player, "playbackStatus").as(s =>
        s === Mpris.PlaybackStatus.PLAYING
            ? "media-playback-pause-symbolic"
            : "media-playback-start-symbolic"
    )
        
    // <icon icon={playerIcon} />
    return <box className="MediaPlayer" vertical={false}>
        <box className="cover-art" css={coverArt} />

        <box vertical>
            <box vertical>
                <box className="title">
                    <label truncate hexpand halign={START} label={title} />
                </box>
                <label halign={START} valign={START} vexpand wrap label={artist} />

            </box>
            <box vertical>
                <slider
                    visible={bind(player, "length").as(l => l > 0)}
                    onDragged={({ value }) => player.position = value * player.length}
                    value={position}
                />
                <centerbox className="actions">
                    <label
                        hexpand
                        className="position"
                        halign={START}
                        visible={bind(player, "length").as(l => l > 0)}
                        label={bind(player, "position").as(lengthStr)}
                    />
                    <box>
                        <button
                            onClicked={() => player.previous()}
                            visible={bind(player, "canGoPrevious")}>
                            <icon icon="media-skip-backward-symbolic" />
                        </button>
                        <button
                            onClicked={() => player.play_pause()}
                            visible={bind(player, "canControl")}>
                            <icon icon={playIcon} />
                        </button>
                        <button
                            onClicked={() => player.next()}
                            visible={bind(player, "canGoNext")}>
                            <icon icon="media-skip-forward-symbolic" />
                        </button>
                    </box>
                    <label
                        className="length"
                        hexpand
                        halign={END}
                        visible={bind(player, "length").as(l => l > 0)}
                        label={bind(player, "length").as(l => l > 0 ? lengthStr(l) : "0:00")}
                    />
                </centerbox>
            </box>
        </box>
    </box>
}

export function music() {
    const mpris = Mpris.get_default()

    return <box vertical className="middle-box music-middle-box">
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
                    <MediaPlayer player={player} />
                ))
            } else {
                // No Spotify found, show all other players
                return arr.map(player => (
                    <MediaPlayer player={player} />
                ))
            }
        })}
    </box>
}
