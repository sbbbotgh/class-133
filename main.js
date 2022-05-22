img1 = "";
state = "";
obj = [];

function preload(){
    img1 = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(800,450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    state = true;
    objectDetector.detect(img1, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        obj = results;
    }
}

function draw(){
    image(img1, 0, 0, 800, 450);
    if(state != ""){
        for(var i = 0; i < obj.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            per = Math.floor(obj[i].confidence * 100);
            text(obj[i].label + " " + per + "%", obj[i].x + 15, obj[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }
}

