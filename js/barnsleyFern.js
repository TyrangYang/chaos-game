const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let drawColorCircle = (centerX, centerY, radius, color) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color;

    ctx.fill();
    ctx.closePath();
};

let drawPoint = (centerX, centerY, color, reverse) => {
    if (reverse) {
        drawColorCircle(centerX, HEIGHT - centerY, 1, color);
    } else {
        drawColorCircle(centerX, centerY, 1, color);
    }
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

let barnsleyFernPoint = [0, 0];
let barnsleyFernIFS1 = new IFS_Matrix(0.0, 0.0, 0.0, 0.16, 0.5, 0.0);
let barnsleyFernIFS2 = new IFS_Matrix(0.85, 0.04, -0.04, 0.85, 0.075, 0.18);
let barnsleyFernIFS3 = new IFS_Matrix(0.2, -0.26, 0.23, 0.22, 0.4, 0.18);
let barnsleyFernIFS4 = new IFS_Matrix(-0.15, 0.28, 0.26, 0.24, 0.575, 0.086);

export function drawBarnsleyFern() {
    setInterval(() => {
        let randomValue = Math.floor(Math.random() * 100);
        if (randomValue == 0) {
            let [nextX, nextY] = barnsleyFernIFS1.nextPoint(
                barnsleyFernPoint[0],
                barnsleyFernPoint[1]
            );
            barnsleyFernPoint[0] = nextX;
            barnsleyFernPoint[1] = nextY;
        } else if (randomValue >= 1 && randomValue <= 85) {
            let [nextX, nextY] = barnsleyFernIFS2.nextPoint(
                barnsleyFernPoint[0],
                barnsleyFernPoint[1]
            );
            barnsleyFernPoint[0] = nextX;
            barnsleyFernPoint[1] = nextY;
        } else if (randomValue >= 86 && randomValue <= 92) {
            let [nextX, nextY] = barnsleyFernIFS3.nextPoint(
                barnsleyFernPoint[0],
                barnsleyFernPoint[1]
            );
            barnsleyFernPoint[0] = nextX;
            barnsleyFernPoint[1] = nextY;
        } else {
            let [nextX, nextY] = barnsleyFernIFS4.nextPoint(
                barnsleyFernPoint[0],
                barnsleyFernPoint[1]
            );
            barnsleyFernPoint[0] = nextX;
            barnsleyFernPoint[1] = nextY;
        }
        drawPoint(
            barnsleyFernPoint[0] * WIDTH,
            barnsleyFernPoint[1] * HEIGHT,
            'red',
            true
        );
    }, 2);
}
