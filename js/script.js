import { drawBarnsleyFern } from './barnsleyFern.js';
import { drawSierpinskiTriangle } from './sierpinskiTriangle.js';
let main = () => {
    drawSierpinskiTriangle();
    drawBarnsleyFern();
};

window.onload = function () {
    main();
};
