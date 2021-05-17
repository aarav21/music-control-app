var x = 0
score_left = 0
score_right = 0
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
function setup(){
    canvas = createCanvas(2000,2000);
    canvas.parent("canvas");

    video = createCapture(VIDEO);
    video.hide();
    video.size(2000,2000)

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);



}

function modelLoaded(){
    console.log('model loaded');

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_left = results[0].pose.keypoints[9].score;
        score_right = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw(){ 
    image(video, 0,0,2000,2000);
    stroke('red');
    fill('red');

    if(score_right > 0.2){
        circle(rightWristX, rightWristY, 20);

        if(rightWristY>0 && rightWristY<=400){
            document.getElementById('speed').innerHTML = '0.5x';
            song.rate(0.5);

        }

        else if(rightWristY>400 && rightWristY<= 800){
            document.getElementById('speed').innerHTML = '1.0x';
            song.rate(1);
        }

        else if(rightWristY>800 && rightWristY<= 1200){
            document.getElementById('speed').innerHTML = '1.5x';
            song.rate(1.5);
        }

        else if(rightWristY>1200 && rightWristY<= 1600){
            document.getElementById('speed').innerHTML = '2.0x';
            song.rate(2.0);
        }

        else if(rightWristY>1600 && rightWristY<= 2000){
            document.getElementById('speed').innerHTML = '2.5x';
            song.rate(2.5);
        }
    }



    if(score_left>0.2){
        circle(leftWristX, leftWristY, 20);
        leftWristY_Number = Number(leftWristY);
        leftWristY_no_decimals = floor(leftWristY_Number);
        volume = leftWristY_no_decimals/2000;
        volume = Number(volume.toFixed(1));
        song.setVolume(volume);
        document.getElementById('volume').innerHTML = volume;
    }

    
}
song = ""
function preload(){
    song = loadSound("relaxing jazz.mp3");
}

function play(){
    if(x == 0){
        x = 1;
        song.play();
        document.getElementById("control").src="https://img.icons8.com/material/112/fa314a/circled-pause.png";
    }
    else if(x == 1){
        x = 0;
        song.pause();
        document.getElementById("control").src="https://img.icons8.com/material-rounded/112/fa314a/play-button-circled--v1.png";
    }

    song.setVolume(1);
    song.rate(1);

}



