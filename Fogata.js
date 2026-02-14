const video = document.getElementById("fogata-video");
const musica = document.getElementById("musica");
const overlay = document.getElementById("start-overlay");
const startBtn = document.getElementById("start-btn");

function enableSubtitles() {
  if (video.textTracks && video.textTracks.length > 0) {
    video.textTracks[0].mode = "showing";
  }
}

async function startVideo() {
  startBtn.disabled = true;
  enableSubtitles();

  try {
    video.muted = false;
    await Promise.all([video.play(), musica.play()]);
    document.body.classList.add("is-playing");
    overlay.classList.add("is-hidden");
  } catch (error) {
    video.muted = true;

    try {
      await Promise.all([video.play(), musica.play()]);
      document.body.classList.add("is-playing");
      overlay.classList.add("is-hidden");
    } catch (innerError) {
      startBtn.disabled = false;
    }
  }
}

startBtn.addEventListener("click", startVideo);
