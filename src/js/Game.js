import goblinImg from '../img/goblin.png';

export default class Game {
  constructor(element) {
    this.element = element;
    this.boardSize = 4;
    this.activeCell = null; // Хранит текущую позицию
  }

  // Метод для отрисовки поля
  drawBoard() {
    const board = document.createElement('div');
    board.className = 'board';

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      board.appendChild(cell);
    }

    this.element.appendChild(board);
    this.cells = Array.from(document.querySelectorAll('.cell')); // Сохраняем ячейки
  }

  // Метод для генерации позиции
  generatePosition() {
    const position = Math.floor(Math.random() * this.cells.length);
    // Если новая позиция совпадает с текущей, генерируем заново (рекурсия)
    if (position === this.activeCell) {
      return this.generatePosition();
    }
    return position;
  }

  // Метод перемещения гоблина
  moveGoblin() {
    // Удаляем картинку из старой ячейки (если она была)
    // На самом деле, appendChild автоматически переместит узел,
    // поэтому removeChild вызывать не обязательно, но для this.activeGoblin нужно.
    
    const index = this.generatePosition();
    this.activeCell = index;

    // Если картинки еще нет, создаем её
    if (!this.goblinElement) {
        this.goblinElement = document.createElement('img');
        this.goblinElement.src = goblinImg;
        this.goblinElement.className = 'goblin';
        this.goblinElement.alt = 'goblin';
    }

    // Магия DOM: если элемент уже есть в другом месте, appendChild его ПЕРЕМЕСТИТ
    this.cells[index].appendChild(this.goblinElement);
  }

  start() {
    this.drawBoard();
    // Первый запуск сразу
    this.moveGoblin(); 
    
    // Интервал перемещения (например, 1 секунда)
    setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }
}