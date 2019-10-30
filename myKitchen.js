// Shapes
let Shape = {
    init(cv, x, y, width, height, color) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
    },

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.fillStyle = '#565555';
        this.ctx.font = "15px Georgia";
        this.ctx.fillText("Gulvelementer", 10, 20);
        this.ctx.fillText("Vægelementer", 10, 120);
        this.ctx.fillText("Dør (Åben)", 10, 190);
    },
};

// Initialize
let initialize = function () {
    canElm = Object.create(Canvas);
    canElm.init('canvasElements', 'transparent');
    can = Object.create(Canvas);
    can.init('myCanvas', 'transparent');
    canElm.canvas.addEventListener('click', hittest);

    // Creating objects
    // Gulvelementer Vandret
    let rect = Object.create(Shape);
    rect.init(canElm, 10, 30, 40, 60, '#518FD8');
    let rect1 = Object.create(Shape);
    rect1.init(canElm, 60, 30, 60, 60, '#518FD8');

    // Gulvelementer Lodret
    let rect6 = Object.create(Shape);
    rect6.init(canElm, 200, 30, 60, 70, '#518FD8');

    // Vægelementer Vandret
    let rect2 = Object.create(Shape);
    rect2.init(canElm, 10, 130, 60, 30, '#3185AD');
    let rect3 = Object.create(Shape);
    rect3.init(canElm, 80, 130, 30, 30, '#3185AD');

    // Vægelementer Lodret
    let rect7 = Object.create(Shape);
    rect7.init(canElm, 200, 130, 30, 75, '#3185AD');

    // Dør åben, vandret og lodret
    let rect4 = Object.create(Shape);
    rect4.init(canElm, 10, 200, 30, 60, '#AD6931');
    let rect5 = Object.create(Shape);
    rect5.init(canElm, 50, 200, 60, 30, '#AD6931');
    
    // Pushing objects
    shapes.push(rect);
    shapes.push(rect1);
    shapes.push(rect2);
    shapes.push(rect3);
    shapes.push(rect4);
    shapes.push(rect5);
    shapes.push(rect6);
    shapes.push(rect7);
    repeater(canElm, shapes);
};

let redraw = function (cv, arr) {
    cv.clear();
    cv.prep();
    //cv.newDraw();
    for (var i = 0; i < arr.length; i++) {
        arr[i].draw();
    }
};

let repeater = function (cv, arr) {
    redraw(cv, arr);
};

let hittest = function (ev) {
    for (let shape of shapes) {
        let cx = shape.ctx;
        if(shape.r){
            cx.beginPath();
            cx.arc(shape.x, shape.y, shape.r, shape.w, shape.math, shape.boo, shape.color);
            cx.closePath();
        } else {
            cx.beginPath();
            cx.rect(shape.x, shape.y, shape.width, shape.height, shape.color);
            cx.closePath();
        }

        let bb = this.getBoundingClientRect();
        let x = (ev.clientX - bb.left) * (this.width / bb.width);
        let y = (ev.clientY - bb.top) * (this.height / bb.height);

        if (cx.isPointInPath(x, y)) {
            can.canvas.addEventListener('click', function room(e) {
                let bb1 = this.getBoundingClientRect();
                let x1 = (e.clientX - bb1.left) * (this.width / bb1.width);
                let y1 = (e.clientY - bb1.top) * (this.height / bb1.height);

                let newShape = Object.create(Shape);

                newShape.init(can, x1, y1, shape.width, shape.height, shape.color);
                shapes2.push(newShape);

                if(newShape.x + newShape.width > can.canvas.width) {
                    let dis = newShape.x + newShape.width;
                    let newDis = dis - can.canvas.width;
                    newShape.x = newShape.x - newDis;
                }
                if(newShape.y + newShape.height > can.canvas.height) {
                    let dis = newShape.y + newShape.height;
                    let newDis = dis - can.canvas.height;
                    newShape.y = newShape.y - newDis;
                }

                canElm.canvas.removeEventListener('click', hittest);
                repeater(can, shapes2);
                can.canvas.removeEventListener('click', room);
                canElm.canvas.addEventListener('click', hittest);

            });
        } else {

        }
    }
};

let size = function() {
    can.canvas.height = $('height').value;
    can.canvas.width = $('width').value;
    height.value = "";
    width.value = "";
};

let canElm;
let can;
let shapes = [];
let shapes2 = [];

document.getElementById("go").addEventListener('click', size);
window.addEventListener('load', initialize);