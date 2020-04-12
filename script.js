const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let drawColorCircle = (centerX, centerY, radius, color) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color;

    ctx.fill();
    ctx.closePath();
};

let drawPoint = (centerX, centerY, color) => {
    drawColorCircle(centerX, centerY, 1, color);
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

let sierpinskiPoint = [0, 0];
let sierpinskiIFS1 = new IFS_Matrix(0.5, 0.0, 0.0, 0.5, 0.0, 0.0);
let sierpinskiIFS2 = new IFS_Matrix(0.5, 0.0, 0.0, 0.5, 0.5, 0.0);
let sierpinskiIFS3 = new IFS_Matrix(0.5, 0.0, 0.0, 0.5, 0.25, 0.433);

let drawSierpinskiTriangle = () => {
    setInterval(() => {
        let randomValue = Math.floor(Math.random() * 3);
        if (randomValue == 0) {
            let [nextX, nextY] = sierpinskiIFS1.nextPoint(
                sierpinskiPoint[0],
                sierpinskiPoint[1]
            );
            sierpinskiPoint[0] = nextX;
            sierpinskiPoint[1] = nextY;
        } else if (randomValue == 1) {
            let [nextX, nextY] = sierpinskiIFS2.nextPoint(
                sierpinskiPoint[0],
                sierpinskiPoint[1]
            );
            sierpinskiPoint[0] = nextX;
            sierpinskiPoint[1] = nextY;
        } else {
            let [nextX, nextY] = sierpinskiIFS3.nextPoint(
                sierpinskiPoint[0],
                sierpinskiPoint[1]
            );
            sierpinskiPoint[0] = nextX;
            sierpinskiPoint[1] = nextY;
        }

        drawPoint(
            sierpinskiPoint[0] * WIDTH,
            sierpinskiPoint[1] * HEIGHT,
            'red'
        );
    }, 2);
};

let main = () => {
    drawSierpinskiTriangle();
};
main();
