const emojis = ['🍕', '🍔', '🍟', '🌮', '🍩', '🍎', '🍉', '🍇'];
let cards = [...emojis, ...emojis];
let flipped = [];
let matched = 0;
let score1 = 0;
let score2 = 0;
let currentPlayer = 1;

const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const turnEl = document.getElementById('turn');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function updateScores() {
  score1El.textContent = score1;
  score2El.textContent = score2;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  turnEl.textContent = `Turn: Player ${currentPlayer}`;
}

function createBoard() {
  board.innerHTML = '';
  shuffle(cards);
  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">${emoji}</div>
      <div class="back">❓</div>
    `;
    board.appendChild(card);

    card.addEventListener('click', () => {
      if (card.classList.contains('flip') || flipped.length === 2) return;

      card.classList.add('flip');
      flipped.push(card);

      if (flipped.length === 2) {
        const [first, second] = flipped;
        const firstEmoji = first.querySelector('.front').textContent;
        const secondEmoji = second.querySelector('.front').textContent;

        if (firstEmoji === secondEmoji) {
          // Match found
          if (currentPlayer === 1) score1++;
          else score2++;

          matched++;
          updateScores();
          flipped = [];

          if (matched === emojis.length) {
            setTimeout(() => {
              let winner = '';
              if (score1 > score2) winner = '🎉 Player 1 Wins!';
              else if (score2 > score1) winner = '🎉 Player 2 Wins!';
              else winner = "It's a Tie!";
              alert(`${winner} Final Score: ${score1} - ${score2}`);
            }, 500);
          }

        } else {
          setTimeout(() => {
            flipped.forEach(c => c.classList.remove('flip'));
            flipped = [];
            switchPlayer();
          }, 800);
        }
      }
    });
  });
}

// Restart Game
restartBtn.addEventListener('click', () => {
  matched = 0;
  score1 = 0;
  score2 = 0;
  currentPlayer = 1;
  flipped = [];
  updateScores();
  turnEl.textContent = `Turn: Player ${currentPlayer}`;
  createBoard();
});

createBoard();
