let input = "";
const screen = document.getElementById("screen");
const keys = document.querySelectorAll(".key");
const startBtn = document.getElementById("startBtn");

const startSound = document.getElementById("startSound");
const pressSound = document.getElementById("pressSound");
const plantSound = document.getElementById("plantSound");

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `00:${min}:${sec}`;
}

function startCountdown(duration) {
  let timeLeft = duration;
  screen.textContent = formatTime(timeLeft);

  const countdown = setInterval(() => {
    timeLeft--;
    screen.textContent = formatTime(timeLeft);

    if (timeLeft <= -1) {
      clearInterval(countdown);
      screen.textContent = "B O O M";
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  startSound.currentTime = 0;
  startSound.play();
  startBtn.disabled = true;

  // Enable keys
  keys.forEach(key => key.disabled = false);
});

keys.forEach(button => {
  button.addEventListener("click", () => {
    if (input.length < 7) {
      input += button.textContent;

      pressSound.currentTime = 0;
      pressSound.play();

      let display = "";
      for (let i = 0; i < 7; i++) {
        display += i < input.length ? input[i] : "*";
        if (i < 6) display += " ";
      }

      screen.textContent = display;

      if (input.length === 7) {
        plantSound.currentTime = 0;
        plantSound.play();
        keys.forEach(key => key.disabled = true);
        startCountdown(40);
      }
    }
  });
});

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (screen.textContent === "B O O M") {
        // Vibrate pattern: vibrate, pause, vibrate
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
        // Add shake class
        document.body.classList.add("shake");

        // Remove shake class after animation duration
        setTimeout(() => {
          document.body.classList.remove("shake");
        }, 1000);
      }
    }
  }
});

// Start observing the screen element for changes in its child nodes (text content)
observer.observe(screen, { childList: true });


