// Shapes
let Shape = {
    init(cv, x, y, width, height, color, price, name) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.price = price;
        this.name = name;
        this.type = "rect";
    },

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + this.height);    
        this.ctx.lineTo(this.x, this.y + this.height + 5);   
        this.ctx.lineTo(this.x + this.width, this.y + this.height + 5);
        this.ctx.lineTo(this.x + this.width, this.y + this.height);
        this.ctx.closePath(this.x, this.y);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
};

let circle = {
    init(cv, x, y, radius, Start, End, sandt, color) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.Start = Start;
        this.End = End;
        this.sandt = sandt;
        this.color = color;
        this.type = "circ";
    },

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, this.Start, this.End, this.sandt);
        this.ctx.fill();
    }
};

let overskrift = {
    init(cv, x, y, name, color) {
        this.ctx = cv.context;
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = "black";
        this.font = "18px Georgia";
        this.type = "overskrift";
    },

    draw() {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.name, this.x, this.y);
    }
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
    rect.init(canElm, 10, 30, 40, 60, '#518FD8', 2999, "Lille skab");
    let rect1 = Object.create(Shape);
    rect1.init(canElm, 60, 30, 60, 60, '#518FD8', 3999, "Skab");

    // Vægelementer Vandret
    let rect2 = Object.create(Shape);
    rect2.init(canElm, 10, 130, 60, 30, '#3185AD', 2999, "Vægskab");
    let rect3 = Object.create(Shape);
    rect3.init(canElm, 80, 130, 30, 30, '#3185AD', 1999, "½ vægskab");

    // Dør åben, vandret og lodret
    let rect4 = Object.create(Shape);
    rect4.init(canElm, 10, 200, 30, 60, '#AD6931');

    let rect5 = Object.create(overskrift);
    rect5.init(canElm, 10, 20, "Skabe");

    let rect6 = Object.create(overskrift);
    rect6.init(canElm, 10, 120, "Vægskabe");

    let rect7 = Object.create(overskrift);
    rect7.init(canElm, 10, 190, "Døre");
    
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

function priceSum() {
    let sum = 0;
    for(i = 0; i < shapes2.length; i++) {
        sum = sum + shapes2[i].price;
    }
    $("sum").innerHTML = sum;
}

var priceCount = 0;
function price() {
        var list = document.createElement("LI");
        var value = document.createTextNode(shapes2[priceCount].price);
        var para = document.createElement("P");
        para.innerHTML = shapes2[priceCount].name;
        list.appendChild(para);
        list.appendChild(value);
        $("price").appendChild(list);
        priceCount = priceCount + 1;
        priceSum();
}

function isOverlapping(obj) {
    if (!isOverlappingX(obj) && !isOverlappingY(obj)) {
        shapes2.push(obj);
        price();
        return false
    } else if (!isOverlappingY(obj) || !isOverlappingX(obj)) {
        shapes2.push(obj);
        price();
        return false
    } else {
        return true
    }
}

function isOverlappingY(obj) {
    if (obj.y + obj.height > myCanvas.height) {
        var distanceh = obj.y + obj.height;
        var pushh = distanceh - myCanvas.height;
        obj.y = obj.y - push;
    }
    if (shapes2.length === 0) {
        return false;
    } else {
        for (i = 0; i < shapes2.length; i++) {
            if (obj.type === "rect") {
                let yOver = obj.y + obj.height;
                if (!(yOver < shapes2[i].y || shapes2[i].y + shapes2[i].height < obj.y)) {
                    console.log("overlapper på y");
                    return true;
                } else {
                    console.log("overlapper ikke på y");
                }
            } else {
                console.log(obj.type)
            }
        } 
        return false;
    }

}

function isOverlappingX(obj) {
    if (obj.x + obj.width > myCanvas.width) {
        var distance = obj.x + obj.width;
        var push = distance - myCanvas.width;
        obj.x = obj.x - push;
    }
    if (shapes2.length === 0) {
        return false;
    } else {
        for (i = 0; i < shapes2.length; i++) {
            if (obj.type === "rect") {
                let xOver = obj.x + obj.width;
                if (!(xOver < shapes2[i].x || shapes2[i].x + shapes2[i].width < obj.x)) {
                    console.log("overlapper på x");
                    return true;
                } else {
                    console.log("overlapper ikke på x");
                }
            } else {
                console.log(obj.type)
            }
        } 
        return false;
    }

}

let hittest = function (ev) {
    for (let i = 0; i < shapes.length; i++) {
        let cx = shapes[i].ctx;
        cx.beginPath();
        if (shapes[i].type === "rect") {
            cx.rect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
        } else {
            cx.arc(shapes[i].x, shapes[i].y, shapes[i].radius, shapes[i].Start, shapes[i].End, shapes[i].sandt);
        }
        cx.closePath();
        let bb = this.getBoundingClientRect();    // get canvas as std obj
        // convert mouse coordinates to canvas coordinates
        let x = (ev.clientX - bb.left) * (this.width / bb.width);
        let y = (ev.clientY - bb.top) * (this.height / bb.height);
        if (cx.isPointInPath(x, y)) {
            // we're in a loop, is this array element the 
            // one we clicked? If yes click in other canvas
            can.canvas.addEventListener('click', function placeInmyCanvas(e) {
                    let bb1 = this.getBoundingClientRect();    // yes
                    // other canvas as std object
                    // convert mouse coordinates to canvas coordinates
                    let x1 = (e.clientX - bb1.left) * (this.width / bb1.width);
                    let y1 = (e.clientY - bb1.top) * (this.height / bb1.height);
                    let obj;
                    if (shapes[i].type === "rect") {
                        obj = Object.create(Shape);
                        obj.init(can, x1, y1, 
                                shapes[i].width, shapes[i].height,
                                shapes[i].color,
                                shapes[i].price,
                                shapes[i].name);
                        isOverlapping(obj); 
                    } else {
                        obj = Object.create(circle);
                        obj.init(can, x1, y1, 
                                shapes[i].radius, shapes[i].Start, shapes[i].End, shapes[i].sandt,
                                shapes[i].color);
                        isOverlapping(obj);
                    }
                    repeater(can, shapes2);
                    can.canvas.removeEventListener('click', placeInmyCanvas);
                });
        } else {
            // window.alert("nohit: "+x+","+y);
        }
    }
}

let paint = function (cv, arr) {
    // loop through array of shapes and draw
    for (var i = 0; i < arr.length; i++) {
        arr[i].draw();
    }
}

let size = function() {
    can.canvas.height = $('height').value / 2 * 100;
    can.canvas.width = $('width').value / 2 * 100;
    height.value = "";
    width.value = "";
};

let canElm;
let can;
let shapes = [];
let shapes2 = [];

document.getElementById("go").addEventListener('click', size);
window.addEventListener('load', initialize);