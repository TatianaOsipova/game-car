(function game() {
    let isPause = false;
    let animationId = null;

    const speed = 3;

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');

    const carCoords = getCoords(car);
    const carMove = {
        top: null,
        bottom: null,
        left: null,
        right: null,
    }
    const treesCoords = [];

    for(let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coordsTree = getCoords(tree);

        treesCoords.push(coordsTree);
    }  

    // keydown, keyup, keypress
    document.addEventListener('keydown', (event) => {
        const code = event.code;

        if (code === 'ArrowUp') {


        }
        else if (code === 'ArrowDown') {

        }
        else if (code === 'ArrowLeft') {

        }
        else if (code === 'ArrowRight') {

        }
    });

    document.addEventListener('keyup', (event) => {
        const code = event.code;

        if (code === 'ArrowUp') {
            carMove.top = requestAnimationFrame(carMoveToTop);
        }
        else if (code === 'ArrowDown') {
             carMove.bottom = requestAnimationFrame(carMoveToBottom);
        }
        else if (code === 'ArrowLeft') {
             carMove.left = requestAnimationFrame(carMoveToLeft);
        }
        else if (code === 'ArrowRight') {
             carMove.right = requestAnimationFrame(carMoveToRight);
        }        
    });    

    function carMoveToTop(){
        const newY = carCoords.y - 5;
        carCoords.y = newY;
        carMove(carCoords.x, newY);
    }

    function carMoveToBottom(){
        const newY = carCoords.y + 5;
        carCoords.y = newY;
        carMove(carCoords.x, newY);      
    }

    function carMoveToLeft(){
        const newX = carCoords.x - 5;
        carCoords.x = newX;
        carMove(newX, carCoords.y);      
    }

    function carMoveToRight(){
        const newX = carCoords.x + 5;
        carCoords.x = newX;
        carMove(newX, carCoords.y);       
    } 
    
    function carMove(x, y) {
        car.style.transform = `translate(${x}px, ${y}px)`;   
    }

    animationId = requestAnimationFrame(startGame);

    function startGame() {
        treesAnimation();

        animationId =requestAnimationFrame(startGame);
    } 
    
    function treesAnimation() {
        for(let i = 0; i < trees.length; i++) {
            const tree = trees[i];
            const coords = treesCoords[i];

            let newYCoord = coords.y + speed;

            if (newYCoord > window.innerHeight) {
                newYCoord = -370;
            }

            // console.log(treesCoords[i]);

            treesCoords[i].y = newYCoord;

            // coordsTree1.y = newYCoord;
            tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
        }        
    }
    
    function getCoords(element) {
        const matrix = window.getComputedStyle(element).transform;
        const array = matrix.split(',');
        const y = array[array.length - 1];
        const x = array[array.length - 2];
        const numericY = parseFloat(y);
        const numericX = parseFloat(x);

        return { x: numericX, y:numericY};
    }

    const gameButton = document.querySelector('.game-button');
    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationId);
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        }
        else{
            animationId =requestAnimationFrame(startGame);
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    });
})();