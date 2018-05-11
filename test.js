var element=0;
var i = 10;
var p = false;
var degree = 0;
var speed = 200;

function pause(){
    if(p) {
        p=false;
        fall();
    } else {
        p=true;
    }
    
}

function start (){
    p=false;
    addElement()
}
function fall () {
    var d = document.getElementById(element);
    d.style.position = "absolute";
    setTimeout(function(){
        d.style.top = i+'px'; 
        i=i+50;
        for (var b=-1;b<element;b++){
            if(b !=-1) {
                var e = document.getElementById(b);
                h = parseInt(e.style.height.split('px')[0])
                w = parseInt(e.style.width.split('px')[0])
                x = parseInt(e.style.top.split('px')[0])
                y = parseInt(e.style.left.split('px')[0])
                var c = document.getElementById(element);
                hc = parseInt(c.style.height.split('px')[0])
                wc = parseInt(c.style.width.split('px')[0])
                xc = parseInt(c.style.top.split('px')[0])
                yc = parseInt(c.style.left.split('px')[0])
                lb={
                    x:yc,
                    y:xc+hc,
                }
                rb={
                    x:yc+wc,
                    y:xc+hc,
                }
                tl={
                    x:y,
                    y:x
                }
                tr={
                    x:y+w,
                    y:x
                }
                if((lb.y===tl.y && (tl.x === lb.x && lb.x<tr.x )) || (rb.y===tr.y && (tr.x === rb.x && rb.x>tl.x )) ){
                    if(lb.y <= 60) {
                        gameOver();
                    } else {
                        element++;
                        i=10;
                        addElement();
                        return;
                    }
                }

            } 
        }
        if (p) {return true}
        if (parseInt(d.style.height.split('px')[0]) === 100) {
            if (i===760) {
                element++;
                i=10;
                addElement();
            } else {fall()}
        } else {

        if (i<800) {
            fall();
        } else {
            element++;
            i=10;
            addElement();}
    }}, speed)
}


function addElement () { 
    speed = 200;
    degree = 0;
    // create a new div element 
    var newDiv = document.createElement("div"); 
    // and give it some content 
    newDiv.setAttribute("id", element);
    newDiv.style.backgroundColor = getRandomColor();
    newDiv.style.color = newDiv.style.backgroundColor;
    var a = Math.floor(Math.random() * 10);
    if (a<3) {
        newDiv.style.width = "100px";
        newDiv.style.height = "50px";
    }
    else if(a<6) {
        newDiv.style.width = "50px";
        newDiv.style.height = "50px";
    } else {
        newDiv.style.width = "50px";
        newDiv.style.height = "100px";
    }

    newDiv.style.left = '210px'; 
    newDiv.innerHTML += '1';
    // add the newly created element and its content into the DOM 
    document.getElementById("main").appendChild(newDiv); 
    indicatorUp();
    fall();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function getRandomFigure() {
    var a = Math.floor(Math.random() * 10);
}


function left() {
    var d = document.getElementById(element);
    if(parseInt(d.style.left.split('px')[0])>10) {
    d.style.left = parseInt(d.style.left.split('px')[0])-50+'px';
    }
}

function right() {
    var d = document.getElementById(element);
    if(parseInt(d.style.left.split('px')[0])<500) {
    d.style.left = parseInt(d.style.left.split('px')[0])+50+'px';
    }
}

function rotate() {
    var d = document.getElementById(element);
    var h = d.style.height;
    var w = d.style.width;
    d.style.height = w;
    d.style.width = h;
}

function indicatorUp() {
    document.getElementById('ind').innerHTML = element+1;
}

function gameOver() {
    pause();
    var newDiv = document.createElement("div"); 
    newDiv.setAttribute("id", 'gameOver');
    newDiv.style.position = "absolute";
    newDiv.style.backgroundColor = '#c7c8ca';
    newDiv.style.color = 'red';
    newDiv.style.width = '200px';
    newDiv.style.height = '50px';
    newDiv.style.textAlign = 'center';
    newDiv.style.lineHeight = '50px';
    newDiv.style.fontSize = '30px';
    newDiv.style.fontWeight = 'bold';
    newDiv.innerHTML += 'Game Over!';
    newDiv.style.left = '180px'; 
    newDiv.style.top = '200px';
    newDiv.style.borderRadius = '100%';
    document.getElementById("main").appendChild(newDiv); 
}

function increaseSpeed() {
    speed = speed - 50;
}


document.onkeydown = function checkKeycode(event)
{
    switch(event.keyCode) {
        case 37 :
            left();
            break;
        case 39 :
            right();
            break;
        case 38 :
            rotate();
            break;
        case 40 :
            increaseSpeed();
            break;
        default:
        console.log(event.keyCode)
    }
}
