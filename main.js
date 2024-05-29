img="";
status="";
objects=[];
song="";

function preload(){
    song= loadSound('alert.mp3.mp3');
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}

function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Object";
}

function draw(){
    image(video,0,0,380,380);

    if(status !=""){
        r= random(225);
        g= random(255);
        b= random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+ "%", objects[i].x +15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("play");
                song.play();
            }
        }
    }
    /*fill("#b5b802");
    text("Dog",45,75);
    noFill();
    stroke("#b5b802");
    rect(30,60,450,350);

    fill("#b5b802");
    text("Cat",320,120);
    noFill();
    stroke("#b5b802");
    rect(300,90,270,320);
    */
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}