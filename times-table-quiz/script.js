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

const questionDiv = document.getElementById('question');
const choicesDiv = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');

function showQuestion() {
  if (index >= questions.length) {
    questionDiv.textContent = 'Quiz complete!';
    choicesDiv.innerHTML = '';
    feedbackDiv.textContent = '';
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
  answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', () => checkAnswer(ans, q.answer));
    choicesDiv.appendChild(btn);
  });
  feedbackDiv.textContent = '';
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    feedbackDiv.textContent = 'Correct!';
    index += 1;
    setTimeout(showQuestion, 500);
  } else {
    feedbackDiv.textContent = 'Try again.';
  }
}

showQuestion();
