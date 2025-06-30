const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const messageEl = document.getElementById('message');
const container = document.querySelector('.container');

let timer = null;
let timeLeft = 60;
let isRunning = false;

function showMessage(msg, duration = 1500) {
  messageEl.textContent = msg;
  messageEl.style.opacity = 1;
  if (duration > 0) {
    setTimeout(() => {
      messageEl.textContent = '';
    }, duration);
  }
}

function updateTimer() {
  timerEl.textContent = `${timeLeft}초`;
}

function startTimer() {
  isRunning = true;
  timeLeft = 60;
  updateTimer();
  showMessage('');
  startBtn.style.display = 'none';
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerEl.textContent = '';
      showMessage('수고했어 오늘도 🌿', 0);
      startBtn.style.display = 'block';
      isRunning = false;
    }
  }, 1000);
}

function handleInterrupt(e) {
  if (isRunning) {
    showMessage('손 떼!');
    e.preventDefault();
    return false;
  }
}

startBtn.addEventListener('click', startTimer);

// 마우스/터치 이벤트 감지
['mousedown', 'touchstart'].forEach(eventType => {
  document.body.addEventListener(eventType, handleInterrupt, { passive: false });
});

// 타이머 중에는 스크롤/선택 등 방지
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    window.scrollTo(0, 0);
  });
} 