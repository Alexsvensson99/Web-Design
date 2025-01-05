// Dark mode/light mode toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
    const body = document.body;

    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        this.textContent = '🌙 Dark Mode';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        this.textContent = '🌞 Light Mode';
    }

    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme);
    document.getElementById('theme-toggle').textContent =
        savedTheme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
});

// Form submit and boiling time display
document.getElementById('egg-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const eggSize = document.querySelector('input[name="egg-size"]:checked').value;
    const eggTemp = document.querySelector('input[name="egg-temp"]:checked').value;
    const eggDoneness = document.getElementById('egg-doneness').value;

    const boilingTimes = {
        small: { room: { soft: 270, medium: 390, hard: 540 }, fridge: { soft: 300, medium: 420, hard: 600 } },
        medium: { room: { soft: 300, medium: 420, hard: 600 }, fridge: { soft: 330, medium: 450, hard: 660 } },
        large: { room: { soft: 360, medium: 480, hard: 660 }, fridge: { soft: 390, medium: 510, hard: 720 } },
    };

    const timeInSeconds = boilingTimes[eggSize][eggTemp][eggDoneness];
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    document.getElementById('boiling-time').innerHTML = `Boil your ${eggSize} egg for <strong>${minutes} minutes and ${seconds} seconds</strong>.`;
    document.getElementById('timer-section').classList.remove('hidden'); // Show the timer section
    document.getElementById('start-timer-btn').classList.remove('hidden'); // Show the "Start Timer" button
    document.getElementById('reset-btn').classList.add('hidden'); // Hide the reset button until timer finishes

    document.getElementById('start-timer-btn').addEventListener('click', () => startTimer(timeInSeconds));
});

// Timer countdown and reset functionality
function startTimer(duration) {
    let remainingTime = duration;
    const timerSound = document.getElementById('timer-sound');

    document.getElementById('start-timer-btn').classList.add('hidden'); // Hide "Start Timer" button when countdown starts
    const interval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (remainingTime <= 0) {
            clearInterval(interval);
            timerSound.play(); // Play sound when timer ends
            alert('Time’s up! Your egg is ready!');
            document.getElementById('reset-btn').classList.remove('hidden'); // Show reset button
        }

        remainingTime--;
    }, 1000);

    // Reset button reloads the form
    document.getElementById('reset-btn').addEventListener('click', () => location.reload());
}