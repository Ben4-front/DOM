import goblinImg from '../img/goblin.png';

export default class Game {
  constructor(element) {
    this.element = element;
    this.boardSize = 4;
    this.activeCell = null; 
    this.intervalId = null; // Храним ID таймера, чтобы не потерять управление
  }

  drawBoard() {
    const board = document.createElement('div');
    board.className = 'board';

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      // Замена appendChild на append (современный стандарт)
      board.append(cell);
    }

    // Замена appendChild на append
    this.element.append(board);
    this.cells = Array.from(document.querySelectorAll('.cell'));
  }

  generatePosition() {
    const position = Math.floor(Math.random() * this.cells.length);
    if (position === this.activeCell) {
      return this.generatePosition();
    }
    return position;
  }

  moveGoblin() {
    const index = this.generatePosition();
    this.activeCell = index;

    if (!this.goblinElement) {
        this.goblinElement = document.createElement('img');
        this.goblinElement.src = goblinImg;
        this.goblinElement.className = 'goblin';
        this.goblinElement.alt = 'goblin';
    }

    // Замена appendChild на append
    this.cells[index].append(this.goblinElement);
  }

  start() {
    this.drawBoard();
    this.moveGoblin(); 
    
    // Сохраняем результат setInterval в переменную класса
    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  // Метод для остановки игры и очистки памяти
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}