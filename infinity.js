const factors = [13, 14, 15, 16, 17, 18, 19];
const allAnswers = [];
for (let a = 13; a <= 19; a++) {
  for (let b = 13; b <= 19; b++) {
    allAnswers.push(a * b);
  }
}

const questionDiv = document.getElementById('question');
const choicesDiv = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const currentButtons = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextQuestion() {
  const a = factors[Math.floor(Math.random() * factors.length)];
  const b = factors[Math.floor(Math.random() * factors.length)];
  const correct = a * b;

  questionDiv.textContent = `${a} \u00d7 ${b} = ?`;

  const answers = [correct];
  while (answers.length < 4) {
    const candidate = allAnswers[Math.floor(Math.random() * allAnswers.length)];
    if (!answers.includes(candidate)) {
      answers.push(candidate);
    }
  }
  shuffle(answers);

  choicesDiv.innerHTML = '';
  currentButtons.length = 0;
  answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', () => checkAnswer(ans, correct));
    choicesDiv.appendChild(btn);
    currentButtons.push(btn);
  });
  feedbackDiv.textContent = '';
  feedbackDiv.style.color = '';
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    feedbackDiv.textContent = 'Correct!';
    feedbackDiv.style.color = 'green';
    setTimeout(nextQuestion, 500);
  } else {
    feedbackDiv.textContent = 'Try again.';
    feedbackDiv.style.color = 'red';
  }
}

nextQuestion();

document.addEventListener('keydown', (e) => {
  if (['1', '2', '3', '4'].includes(e.key)) {
    const idx = parseInt(e.key, 10) - 1;
    const btn = currentButtons[idx];
    if (btn) {
      btn.click();
    }
  }
});