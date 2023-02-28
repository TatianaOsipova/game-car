

(function game() {
    let isPause = false;

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');

    const gameButton = document.querySelector('.game-button');

    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        }
        else{
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    });

    console.log(car);
    console.log(trees);

})();