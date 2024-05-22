document.title = "Dodging ads!";

// sourced from: "https://github.com/1polygon/ad-mute/blob/main/twitch.js"
class TwitchAdMute {
    constructor() {
        this.ad = false;

        // Observe changes inside the document body and mute player when ads are playing
        this.observer = new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (this.isAdPlaying()) {
                        if (!this.ad) {
                            this.setMuted(true);
                            this.ad = true;
                            this.popOutPlayer()
                        }
                    } else if (this.ad) {
                        this.setMuted(false);
                        this.ad = false;
                    }
                }
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    isAdPlaying() {
        return document.querySelector("[data-a-target='video-ad-countdown']") ? true : false;
    }

    setMuted(muted) {
        const video = document.querySelector("video");
        if (video) {
            video.muted = muted;
        }
    }

    popOutPlayer() {
        const videoPlayers = document.querySelectorAll("video")
        const [playerWidth, playerHeight] = [videoPlayers[0].offsetWidth, videoPlayers[0].offsetHeight]
        console.log([playerWidth, playerHeight])
        if (videoPlayers.length > 1) {
            const miniPlayer = videoPlayers[1]
            console.log(miniPlayer)
            miniPlayer.requestPictureInPicture() // requestPictureInPicture seemingly does not work in firefox
        }
    }
}

new TwitchAdMute();
