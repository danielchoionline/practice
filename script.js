const factors = [13, 14, 15, 16, 17, 18, 19];
const questions = [];

for (let i = 0; i < factors.length; i++) {
  for (let j = 0; j < factors.length; j++) {
    questions.push({
      a: factors[i],
      b: factors[j],
      answer: factors[i] * factors[j]
    });
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(questions);

const allAnswers = questions.map(q => q.answer);
let index = 0;
let correctCount = 0;

const questionDiv = document.getElementById('question');
const choicesDiv = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score');
const currentButtons = [];

function showQuestion() {
  if (index >= questions.length) {
    questionDiv.textContent = 'Quiz complete!';
    choicesDiv.innerHTML = '';
    feedbackDiv.textContent = '';
    scoreDiv.textContent = `Final Score: ${correctCount} / ${questions.length}`;
    return;
  }

  const q = questions[index];
  questionDiv.textContent = `${q.a} \u00d7 ${q.b} = ?`;

  const answers = [q.answer];
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
    btn.addEventListener('click', () => checkAnswer(ans, q.answer));
    choicesDiv.appendChild(btn);
    currentButtons.push(btn);
  });
  feedbackDiv.textContent = '';
  feedbackDiv.style.color = '';
  scoreDiv.textContent = `Score: ${correctCount} / ${index}`;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    feedbackDiv.textContent = 'Correct!';
    feedbackDiv.style.color = 'green';
    index += 1;
    correctCount += 1;
    scoreDiv.textContent = `Score: ${correctCount} / ${index}`;
    setTimeout(showQuestion, 500);
  } else {
    feedbackDiv.textContent = 'Try again.';
    feedbackDiv.style.color = 'red';
  }
}

showQuestion();

document.addEventListener('keydown', (e) => {
  if (['1', '2', '3', '4'].includes(e.key)) {
    const idx = parseInt(e.key, 10) - 1;
    const btn = currentButtons[idx];
    if (btn) {
      btn.click();
    }
  }
});