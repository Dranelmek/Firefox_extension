document.title = "Dodging ads!";

// sourced from: "https://github.com/1polygon/ad-mute/blob/main/twitch.js"
class TwitchAdMute {
    constructor() {
        this.ad = false;
        console.log(`Ad dodger launched`)

        // Observe changes inside the document body and mute player when ads are playing
        this.observer = new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (this.isAdPlaying()) {
                        const [main, mini] = document.querySelectorAll("video");
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
        const [main, mini] = document.querySelectorAll("video");
        console.log(main.volume)
        if (mini) {
            mini.muted = false;
            mini.volume = 0.1;
        }


        
        // if (videoPlayers.length > 1) {
        //     const miniPlayer = videoPlayers[1]
        //     console.log(`mini player: ${miniPlayer}`)
        //     miniPlayer.requestPictureInPicture() // requestPictureInPicture does not work in firefox
        // }
    }
}

new TwitchAdMute();
