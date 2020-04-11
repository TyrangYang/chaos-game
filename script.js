const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;

let drawColorCircle = (centerX, centerY, radius, color) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color;

    ctx.fill();
    ctx.closePath();
};

let drawPoint = (centerX, centerY, color) => {
    drawColorCircle(centerX, centerY, 2, color);
};

// -       -   -   -   -   -
// | x1 x2 | * | x | + | a |
// | y1 y2 |   | y | + | b |
// _       _   _   _   _   _

class IFS_Matrix {
    constructor(x1, x2, y1, y2, a, b) {
        this.linerMatrix = [
            [x1, x2],
            [y1, y2],
        ];
        this.moveMatrix = [a, b];
    }

    nextPoint(x, y) {
        let nextX =
            this.linerMatrix[0][0] * x +
            this.linerMatrix[0][1] * y +
            this.moveMatrix[0];
        let nextY =
            this.linerMatrix[1][0] * x +
            this.linerMatrix[1][1] * y +
            this.moveMatrix[1];
        return [nextX, nextY];
    }
}

// let m1 = new IFS_Matrix(0.5, 0.0, 0.5, 0.0, 0.0, 0.5);
// let m2 = new IFS_Matrix(0.5, 0.0, 0.0, 0.5, 0.25, 0.0);
// let m3 = new IFS_Matrix(0.0, 0.5, 0.0, 0.5, 0.0, 0.433);

let points_X = [0, canvasCenterX * 2, 0];
let points_Y = [0, 0, canvasCenterY * 2];
let startPoint = [Math.random() * canvas.width, Math.random() * canvas.height];

setInterval(() => {
    let randomValue = Math.floor(Math.random() * 3);
    startPoint[0] = (startPoint[0] + points_X[randomValue]) / 2;
    startPoint[1] = (startPoint[1] + points_Y[randomValue]) / 2;
    // console.log(startPoint[0], startPoint[1]);
    drawPoint(startPoint[0], startPoint[1], 'red');
}, 10);
