const colors = ['#c25997', '#41c519', '#763dc2', '#bebb16', '#03c8c3'];
let colorsCount = 0;

const canvasTop = document.getElementById("canvasTop");
const contextTop = canvasTop.getContext("2d");
canvasTop.width = document.documentElement.clientWidth;
canvasTop.height = document.documentElement.clientHeight;

const canvasBottom = document.getElementById("canvasBottom");
const contextBottom = canvasBottom.getContext("2d");
canvasBottom.width = document.documentElement.clientWidth;
canvasBottom.height = document.documentElement.clientHeight;

let mouse = {x: 0, y: 0};
let draw = false;
let circleTop;
let circleBottom;
let circleLeft;
let circleRight;

canvasTop.addEventListener("mousedown", function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw = true;
    contextTop.beginPath();
    contextTop.moveTo(mouse.x, mouse.y);
    circleTop = mouse.y;
    circleBottom = mouse.y;
    circleLeft = mouse.x;
    circleRight = mouse.x;
});

canvasTop.addEventListener("mousemove", function (e) {
    if (draw == true) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        contextTop.strokeStyle = '#adadad';
        contextTop.lineTo(mouse.x, mouse.y);
        contextTop.stroke();
        circleTop = Math.min(circleTop, mouse.y);
        circleBottom = Math.max(circleBottom, mouse.y);
        circleLeft = Math.min(circleLeft, mouse.x);
        circleRight = Math.max(circleRight, mouse.x);
    }
});

canvasTop.addEventListener("mouseup", function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    contextTop.lineTo(mouse.x, mouse.y);
    contextTop.stroke();
    contextTop.closePath();
    draw = false;
    let centreX = (circleLeft + circleRight) / 2;
    let centreY = (circleTop + circleBottom) / 2;
    let radius = ((circleBottom - circleTop) + (circleRight - circleLeft)) / 4;
    contextBottom.beginPath();
    contextBottom.arc(centreX, centreY, radius, 0, 2 * Math.PI, false);
    contextBottom.lineWidth = 2;
    contextBottom.strokeStyle = colors[colorsCount];
    contextBottom.stroke();
    colorsCount = (colorsCount < (colors.length - 1) ) ? ++colorsCount : 0;
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
});
