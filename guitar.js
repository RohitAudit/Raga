// Object to hold audio elements for each guitar string
const audioFiles = {
    s6: document.getElementById('as1'), // Assuming IDs of audio elements are as1, as2, ...
    s5: document.getElementById('as2'),
    s4: document.getElementById('as3'),
    s3: document.getElementById('as4'),
    s2: document.getElementById('as5'),
    s1: document.getElementById('as6')
};

let currentlyPlaying = null; // Track currently playing audio

// Function to play the audio for the given string ID
function playString(thisString) {
    const audioElement = audioFiles[thisString];
    if (audioElement) {
        // Check if a different audio is currently playing
        if (currentlyPlaying && currentlyPlaying !== audioElement) {
            currentlyPlaying.pause(); // Pause the currently playing audio
            currentlyPlaying.currentTime = 0; // Reset time to start
        }

        const playPromise = audioElement.play(); // Start playback

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Add "playing-sound" class when audio starts playing
                const stringElement = document.getElementById(thisString);
                stringElement.classList.add('playing');
                document.getElementById(thisString + 'Note').classList.add('lightOn');

                // Update currentlyPlaying to the current audio element
                currentlyPlaying = audioElement;

                // Remove class when audio ends
                const removePlayingSoundClass = () => {
                    stringElement.classList.remove('playing-sound');
                    document.getElementById(thisString + 'Note').classList.remove('lightOn');
                    audioElement.removeEventListener('ended', removePlayingSoundClass); // Clean up the event listener
                    currentlyPlaying = null; // Reset currentlyPlaying when done
                };

                audioElement.addEventListener('ended', removePlayingSoundClass);
            }).catch((error) => {
                console.log('Playback blocked:', error);
            });
        }
    } else {
        console.error(`Audio element for ${thisString} not found.`);
    }
}

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
            playString(id); // Play each string using playString function
        }, delays[index]); // Delay each audio play
    });
}

// Add event listeners to each button for hover effects
document.querySelectorAll('.string').forEach((button) => {
    button.addEventListener('mouseenter', () => {
        playString(button.id); // Play audio when hovered over
    });
});

// Enable audio playback after any user interaction on the document
document.addEventListener('click', () => {
    if (!audioEnabled) {
        enableAudio(); // Enable audio and play strings
    }
});