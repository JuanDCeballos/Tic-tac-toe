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

  // const resetInput = (() => {
  //   document.querySelector('#form').reset();
  //   document.querySelector('#form1').reset();
  // })();

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
      // for (let i = 0; i < arr.length; i++) {
      if (
        (arr[0] == marker && arr[4] == marker && arr[8] == marker) ||
        (arr[2] == marker && arr[4] == marker && arr[6] == marker)
      ) {
        console.log(`Diagonal, ${name} has won the game.`);
        return;
      } else if (
        (arr[0] == marker && arr[3] == marker && arr[6] == marker) ||
        (arr[1] == marker && arr[4] == marker && arr[7] == marker) ||
        (arr[2] == marker && arr[5] == marker && arr[8] == marker)
      ) {
        console.log(`Vertical, ${name} has won the game.`);
        return;
      } else if (
        (arr[0] == marker && arr[1] == marker && arr[2] == marker) ||
        (arr[3] == marker && arr[4] == marker && arr[5] == marker) ||
        (arr[6] == marker && arr[7] == marker && arr[8] == marker)
      ) {
        console.log(`Horizontal, ${name} has won the game.`);
        return;
      } else {
        console.log('Draw');
        return;
      }
      // }
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

    Gameboard.grid.forEach((el) => {
      el.addEventListener('click', (e) => {
        console.log(currentPlayer.getName());
        const index = e.target.id;
        if (e.target.textContent == 'X' || e.target.textContent == 'O') {
          e.target.removeEventListener('click', null);
          e.target.disabled = true;
        } else {
          Gameboard.gameboard[index] = currentPlayer.getMarker();
          Gameboard.render();
          if (
            Gameboard.checkWin(
              Gameboard.gameboard,
              currentPlayer.getMarker(),
              currentPlayer.getName()
            )
          ) {
            // el.disabled = true;
          }
        }
        if (currentPlayer.getMarker() == 'X') {
          currentPlayer = playerTwo;
        } else {
          currentPlayer = playerOne;
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
