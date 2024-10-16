    // Play all chords when the page loads with delays
    window.addEventListener('load', () => {
        playAllStrings(); // Play all strings on page load
    });

    // Play all strings with delays
    function playAllStrings() {
        const stringIds = ['s6', 's5', 's4', 's3', 's2', 's1'];
        const delays = [0, 300, 600, 900, 1200, 1500]; // Delay for each string in milliseconds

        stringIds.forEach((id, index) => {
            setTimeout(() => {
                const audioElement = document.getElementById('as' + (7 - parseInt(id.charAt(1))));
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        const stringButton = document.getElementById(id);
                        stringButton.classList.add('playing-sound');
                        document.getElementById(id + 'Note').classList.add('lightOn');

                        audioElement.addEventListener('ended', () => {
                            stringButton.classList.remove('playing-sound');
                            document.getElementById(id + 'Note').classList.remove('lightOn');
                        });
                    }).catch((error) => {
                        console.log('Playback blocked:', error);
                    });
                }
            }, delays[index]); // Delay each audio play
        });
    }

    // Play String on Hover
    function playString(thisString) {
        const audioElement = document.getElementById('as' + (7 - parseInt(thisString.charAt(1))));
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();

        const stringElement = document.getElementById(thisString);
        stringElement.classList.add('playing-sound');
        document.getElementById(thisString + 'Note').classList.add('lightOn');

        audioElement.addEventListener('ended', () => {
            stringElement.classList.remove('playing-sound');
            document.getElementById(thisString + 'Note').classList.remove('lightOn');
        });
    }