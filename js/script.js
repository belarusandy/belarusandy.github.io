function resizeGame() {

    let gameArea = document.getElementById('gameArea');

    let widthToHeight = 4 / 3;

    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;

    let newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * newWidthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    }

    gameArea.style.marginLeft = (-newWidth / 2) + 'px'; // ERROR?
    gameArea.style.marginTop = (-newHeight / 2) + 'px';

    gameArea.style.fontSize = (newWidth / 400) + 'em';

    let gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.style.width = newWidth;
    gameCanvas.style.height = newHeight;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);