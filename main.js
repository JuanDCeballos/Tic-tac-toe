const start = document.querySelector('#start-btn');

start.addEventListener('click', () => {
  const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {
      getName,
      getMarker,
    };
  };

  const Gameboard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];

    const grid = document.querySelectorAll('.box');

    const render = () => {
      gameboard.forEach((item, index) => {
        let gridElement = grid[index];
        gridElement.textContent = item;
      });
    };

    const checkWin = (arr, marker, name) => {
      if (
        (arr[0] == marker && arr[4] == marker && arr[8] == marker) ||
        (arr[2] == marker && arr[4] == marker && arr[6] == marker)
      ) {
        document.querySelector(
          '.status'
        ).textContent = `Diagonal, ${name} has won the game.`;
        return true;
      } else if (
        (arr[0] == marker && arr[3] == marker && arr[6] == marker) ||
        (arr[1] == marker && arr[4] == marker && arr[7] == marker) ||
        (arr[2] == marker && arr[5] == marker && arr[8] == marker)
      ) {
        document.querySelector(
          '.status'
        ).textContent = `Vertical, ${name} has won the game.`;
        return true;
      } else if (
        (arr[0] == marker && arr[1] == marker && arr[2] == marker) ||
        (arr[3] == marker && arr[4] == marker && arr[5] == marker) ||
        (arr[6] == marker && arr[7] == marker && arr[8] == marker)
      ) {
        document.querySelector(
          '.status'
        ).textContent = `Horizontal, ${name} has won the game.`;
        return true;
      } else if (arr.every((el) => el == marker || !marker)) {
        console.log('ci');
      } else if (arr.every((el) => el !== '')) {
        document.querySelector('.status').textContent = `The game is a tie`;
        return true;
      }
    };

    return {
      render,
      gameboard,
      grid,
      checkWin,
    };
  })();

  const displayController = (() => {
    const playerOne = Player(document.querySelector('#p1').value, 'X');
    const playerTwo = Player(document.querySelector('#p2').value, 'O');

    let currentPlayer = playerOne;
    document.querySelector(
      '.turn'
    ).textContent = `Is ${currentPlayer.getName()} turn`;

    let isGameOver = false;

    Gameboard.grid.forEach((el) => {
      el.addEventListener('click', (e) => {
        if (!e.target.textContent && !isGameOver) {
          const index = e.target.id;
          Gameboard.gameboard[index] = currentPlayer.getMarker();
          Gameboard.render();
          if (
            Gameboard.checkWin(
              Gameboard.gameboard,
              currentPlayer.getMarker(),
              currentPlayer.getName()
            )
          ) {
            isGameOver = true;
          }
          if (currentPlayer.getMarker() == 'X') {
            currentPlayer = playerTwo;
            document.querySelector(
              '.turn'
            ).textContent = `Is ${currentPlayer.getName()} turn`;
          } else {
            currentPlayer = playerOne;
            document.querySelector(
              '.turn'
            ).textContent = `Is ${currentPlayer.getName()} turn`;
          }
        }
      });
    });
  })();

  const resetInput = (() => {
    document.querySelectorAll('.form').forEach((el) => {
      el.reset();
    });
  })();
});

const reset = document.querySelector('#cta');
reset.addEventListener('click', () => {
  window.location.reload();
});
