const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const messageEl = document.getElementById('message');
const progressBar = document.getElementById('progress-bar');

let timer = null;
let timeLeft = 60;
let isRunning = false;
let lastInterrupt = 0;

function showMessage(msg, duration = 1500) {
  messageEl.textContent = msg;
  messageEl.style.opacity = 1;
  if (duration > 0) {
    setTimeout(() => {
      // 타이머 종료 메시지는 유지
      if (messageEl.textContent === msg && msg !== '수고했어 오늘도 🌿') {
        messageEl.textContent = '';
      }
    }, duration);
  }
}

function updateProgressBar() {
  const percent = (timeLeft / 60) * 100;
  progressBar.style.width = percent + '%';
}

function startTimer() {
  isRunning = true;
  timeLeft = 60;
  updateProgressBar();
  showMessage('');
  startBtn.style.display = 'none';
  timer = setInterval(() => {
    timeLeft--;
    updateProgressBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      progressBar.style.width = '0%';
      showMessage('수고했어 오늘도 🌿', 0);
      startBtn.style.display = 'block';
      isRunning = false;
    }
  }, 1000);
}

function handleInterrupt(e) {
  if (isRunning) {
    // 너무 자주 알림이 뜨지 않도록 1초 쿨타임
    const now = Date.now();
    if (now - lastInterrupt > 1000) {
      showMessage('손 떼!');
      lastInterrupt = now;
    }
    e.preventDefault();
    return false;
  }
}

startBtn.addEventListener('click', startTimer);

// 마우스/터치 이동 및 클릭/터치 이벤트 감지
['mousedown', 'touchstart', 'mousemove', 'touchmove'].forEach(eventType => {
  document.body.addEventListener(eventType, handleInterrupt, { passive: false });
});

// 타이머 중에는 스크롤/선택 등 방지
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    window.scrollTo(0, 0);
  });
} 