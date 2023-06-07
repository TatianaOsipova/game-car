(function game() {
    let isPause = false;
    let animationId = null;

    const speed = 3;

    const car = document.querySelector('.car');
    const carInfo = {
        width: car.clientWidth / 2,
        height: car.clientHeight,
        coords: getCoords(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        }        
    }

    const coin = document.querySelector('.coin');
    const coinInfo = {
        coords: getCoords(coin),
        height: coin.clientHeight,
        width: coin.clientWidth / 2,
    }
    // const coinInfo.coords = getCoords(coin);
    // const coinInfo.width = oin.clientWidth / 2;
    // const coinInfo.height = coin.clientHeight;

    const danger = document.querySelector('.danger');
    
    // const dangerCoord = getCoords(danger);
    // const dangerWidth = danger.clientWidth / 2;   

    const arrow = document.querySelector('.arrow');
    // const arrowCoord = getCoords(arrow);
    // const arrowWidth = arrow.clientWidth / 2;    

    const road = document.querySelector('.road');
    const roadHeight = road.clientHeight;
    const roadWidth = road.clientWidth / 2;   

    const trees = document.querySelectorAll('.tree');
    const treesCoords = [];    

    for (let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coordsTree = getCoords(tree);

        treesCoords.push(coordsTree);
    }

    // keydown, keyup, keypress
    document.addEventListener('keydown', (event) => {
        // if (isPause) {
        //     return;
        // }

        const code = event.code;
        // WASD
        if (code === 'ArrowUp' && carInfo.move.top === null) {
            if (carInfo.move.bottom) {
                return;
            }
            carInfo.move.top = requestAnimationFrame(carMoveToTop);
        } else if (code === 'ArrowDown' && carInfo.move.bottom === null) {
            if (carInfo.move.top) {
                return;
            }
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
        } else if (code === 'ArrowLeft' && carInfo.move.left === null) {
            if (carInfo.move.right) {
                return;
            }
            carInfo.move.left = requestAnimationFrame(carMoveToLeft);
        } else if (code === 'ArrowRight' && carInfo.move.right === null) {
            if (carInfo.move.left) {
                return;
            }
            carInfo.move.right = requestAnimationFrame(carMoveToRight);
        }
    });

    document.addEventListener('keyup', (event) => {
        const code = event.code;

        if (code === 'ArrowUp') {
            cancelAnimationFrame(carInfo.move.top);
            carInfo.move.top = null;
        } else if (code === 'ArrowDown') {
            cancelAnimationFrame(carInfo.move.bottom);
            carInfo.move.bottom = null;
        } else if (code === 'ArrowLeft') {
            cancelAnimationFrame(carInfo.move.left);
            carInfo.move.left = null;
        } else if (code === 'ArrowRight') {
            cancelAnimationFrame(carInfo.move.right);
            carInfo.move.right = null;
        }
    });

    function carMoveToTop() {
        const newY = carInfo.coords.y - 5;

        // if (newY < 0) {
        //     return;
        // }
        carInfo.coords.y = newY;
        carMove(carInfo.coords.x, newY);
        carInfo.move.top = requestAnimationFrame(carMoveToTop);
    }

    function carMoveToBottom() {
        const newY = carInfo.coords.y + 5;
        // if (newY + carInfo.height > roadHeight) {
        //     return;
        // }
        carInfo.coords.y = newY;
        carMove(carInfo.coords.x, newY);
        carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
    }

    function carMoveToLeft() {
        const newX = carInfo.coords.x - 5;

        // if (newX < -roadWidth + carInfo.width) {
        //     return;
        // }

        carInfo.coords.x = newX;
        carMove(newX, carInfo.coords.y);
        carInfo.move.left = requestAnimationFrame(carMoveToLeft);
    }

    function carMoveToRight() {
        const newX = carInfo.coords.x + 5;

        // if (newX > roadWidth - carInfo.width) {
        //     return;
        // }

        carInfo.coords.x = newX;
        carMove(newX, carInfo.coords.y);
        carInfo.move.right = requestAnimationFrame(carMoveToRight);
    }

    function carMove(x, y) {
        console.log(hasCollision());
        car.style.transform = `translate(${x}px, ${y}px)`;
    }

    animationId = requestAnimationFrame(startGame);

    function startGame() {
        treesAnimation();
        elementAnimation(coin, coinInfo.coords, coinInfo.width, -100);
        // elementAnimation(danger, dangerCoord, dangerWidth, -250);
        // elementAnimation(arrow, arrowCoord, arrowWidth, -600);

        animationId = requestAnimationFrame(startGame);
    }

    function treesAnimation() {
        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i];
            const coords = treesCoords[i];

            let newYCoord = coords.y + speed;

            if (newYCoord > window.innerHeight) {
                newYCoord = -370;
            }

            treesCoords[i].y = newYCoord;
            tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
        }
    }

    // function coinAnimation() {
    //     let newYCoord = coinInfo.coords.y + speed;
    //     let newXCoord = coinInfo.coords.x;

    //     if (newYCoord > window.innerHeight) {
    //         newYCoord = -100;

    //         const direction = parseInt(Math.random() * 2);
    //         const maxXCoord = (roadWidth + 1 - coinInfo.width);
    //         const randomXCoord = parseInt(Math.random() * maxXCoord);

    //         // if (direction === 0) { // двигаем влево
    //         //     newXCoord = -pandomXCoord;
    //         // }
    //         // else if (direction === 1) { // двигаем вправо
    //         //     newXCoord = pandomXCoord;
    //         // }

    //         newXCoord = direction === 0 // одинаковый код с ^
    //             ? -randomXCoord 
    //             : randomXCoord;   
    //     }   
        
    //     coinInfo.coords.x = newXCoord;
    //     coinInfo.coords.y = newYCoord;
    //     coin.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
    // } 
    
    // function dangerAnimation() {
    //     let newYCoord = dangerCoord.y + speed;
    //     let newXCoord = dangerCoord.x;

    //     if (newYCoord > window.innerHeight) {
    //         newYCoord = -250;

    //         const direction = parseInt(Math.random() * 2);
    //         const maxXCoord = (roadWidth + 1 - dangerWidth);
    //         const randomXCoord = parseInt(Math.random() * maxXCoord);

    //         // if (direction === 0) { // двигаем влево
    //         //     newXCoord = -pandomXCoord;
    //         // }
    //         // else if (direction === 1) { // двигаем вправо
    //         //     newXCoord = pandomXCoord;
    //         // }

    //         newXCoord = direction === 0 // одинаковый код с ^
    //             ? -randomXCoord 
    //             : randomXCoord;   
    //     }   
        
    //     dangerCoord.x = newXCoord;
    //     dangerCoord.y = newYCoord;
    //     danger.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
    // }  

    // function arrowAnimation() {
    //     let newYCoord = arrowCoord.y + speed;
    //     let newXCoord = arrowCoord.x;

    //     if (newYCoord > window.innerHeight) {
    //         newYCoord = -600;

    //         const direction = parseInt(Math.random() * 2);
    //         const maxXCoord = (roadWidth + 1 - arrowWidth);
    //         const randomXCoord = parseInt(Math.random() * maxXCoord);

    //         // if (direction === 0) { // двигаем влево
    //         //     newXCoord = -pandomXCoord;
    //         // }
    //         // else if (direction === 1) { // двигаем вправо
    //         //     newXCoord = pandomXCoord;
    //         // }

    //         newXCoord = direction === 0 // одинаковый код с ^
    //             ? -randomXCoord 
    //             : randomXCoord;   
    //     }   
        
    //     arrowCoord.x = newXCoord;
    //     arrowCoord.y = newYCoord;
    //     arrow.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
    // } 

    function elementAnimation(elem, elemCoord, elemWidth, elemInitialYCoord) {
        let newYCoord = elemCoord.y + speed;
        let newXCoord = elemCoord.x;

        if (newYCoord > window.innerHeight) {
            newYCoord = elemInitialYCoord;

            const direction = parseInt(Math.random() * 2);
            const maxXCoord = (roadWidth + 1 - elemWidth);
            const randomXCoord = parseInt(Math.random() * maxXCoord);

            // if (direction === 0) { // двигаем влево
            //     newXCoord = -pandomXCoord;
            // }
            // else if (direction === 1) { // двигаем вправо
            //     newXCoord = pandomXCoord;
            // }

            newXCoord = direction === 0 // одинаковый код с ^
                ? -randomXCoord 
                : randomXCoord;   
        }   
        
        elemCoord.x = newXCoord;
        elemCoord.y = newYCoord;
        elem.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
    }    

    function getCoords(element) {
        const matrix = window.getComputedStyle(element).transform;
        const array = matrix.split(',');
        const y = array[array.length - 1];
        const x = array[array.length - 2];
        const numericY = parseFloat(y);
        const numericX = parseFloat(x);

        return {
            x: numericX,
            y: numericY
        };
    }

    function hasCollision(
        elem1Coords,
        elem1Width,
        elem1Height,
        elem2Coords,
        elem2Width,
        elem2Height,
    ) {

        const carYTop = carInfo.coords.y;
        const carYBottom = carInfo.coords.y + carInfo.height;

        const carXLeft = carInfo.coords.x - carInfo.width;
        const carXRight = carInfo.coords.x + carInfo.width;

        const coinYTop = coinInfo.coords.y;
        const coinYBottom = coinInfo.coords.y + coinInfo.height;

        const coinXLeft = coinInfo.coords.x - coinInfo.width;
        const coinXRight = coinInfo.coords.x + coinInfo.width;

        if (carYTop > coinYBottom || carYBottom < coinYTop) {
            return false;
        }

        if (carXLeft > coinXRight || carXRight < coinXLeft) {
            return false;
        }

        return true;
    }

    const gameButton = document.querySelector('.game-button');
    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationId);
            cancelAnimationFrame(carInfo.move.top);
            cancelAnimationFrame(carInfo.move.bottom);
            cancelAnimationFrame(carInfo.move.left);
            cancelAnimationFrame(carInfo.move.right);
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        } else {
            animationId = requestAnimationFrame(startGame);
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    });
})();