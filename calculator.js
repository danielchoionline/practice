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

let index = 0;

const questionDiv = document.getElementById('question');
const input = document.getElementById('answerInput');
const feedbackDiv = document.getElementById('feedback');

function showQuestion() {
  if (index >= questions.length) {
    questionDiv.textContent = 'Quiz complete!';
    input.style.display = 'none';
    feedbackDiv.textContent = '';
    return;
  }

  const q = questions[index];
  questionDiv.textContent = `${q.a} \u00d7 ${q.b} = ?`;
  feedbackDiv.textContent = '';
  feedbackDiv.style.color = '';
  input.value = '';
  input.focus();
}

input.addEventListener('keydown', (e) => {
  if (!(/[0-9]/.test(e.key) || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key))) {
    e.preventDefault();
  }
});

input.addEventListener('input', () => {
  const val = input.value;
  if (val === '') {
    feedbackDiv.textContent = '';
    return;
  }
  const num = parseInt(val, 10);
  if (num === questions[index].answer) {
    feedbackDiv.textContent = 'Correct!';
    feedbackDiv.style.color = 'green';
    index += 1;
    setTimeout(showQuestion, 500);
  } else {
    feedbackDiv.textContent = 'Try again.';
    feedbackDiv.style.color = 'red';
  }
});

showQuestion();