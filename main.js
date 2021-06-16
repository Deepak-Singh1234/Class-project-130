song = "" ;
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("butter chicken , chicken biriyani");
}

function draw(){
    image(video , 0 , 0 , 600 , 500) ;
    r = random(255);
    g = random(255);
    b = random(255);
    fill(r,g,b);
    stroke(r,g,b);
    
    if(scoreLeftWrist > 0.2){
    circle(leftWristX , leftWristY , 20);
    makeleftwrstno = Number(leftWristY);
    roundY = floor(makeleftwrstno);
    output = roundY/500;
    document.getElementById("hhr").innerHTML = "volume = "+output;
    song.setVolume(output);
}
   if(scoreRightWrist > 0.2){
    circle(rightWristX , rightWristY , 20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("hrr").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }

    if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("hrr").innerHTML = "speed = 1.0x";
        song.rate(1.0);
    }


    if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("hrr").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }


    if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("hrr").innerHTML = "speed = 2.0x";
        song.rate(2.0);
    }


    if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("hrr").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }

   }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function stop(){
    song.stop();
    
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightwristX = " + rightWristX + "rightwristY = "+ rightWristY);
    console.log("leftwristX = " + leftWristX + "leftwristY = "+ leftWristY);
    console.log("score ========= " + scoreLeftWrist);
}
}