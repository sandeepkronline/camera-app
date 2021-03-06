// Set constraints for the video stream
//var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;
var frontCamera = true

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
    cameraSwitch = document.querySelector("#camera--switch");

function GetConstraints(){
    facingModeStr = frontCamera ? "user" : "environment";
    var constraints = { video: { facingMode: facingModeStr }, audio: false };
    return constraints
}

function SwitchCamera(){
    if (true == frontCamera) {
        cameraStartRear();   
    }
    else{
        cameraStartFront();
    }
}

// Access the device camera and stream to cameraView
function cameraStartFront() {  
    frontCamera = true
    var constraints = { video: { facingMode: "user" }, audio: false };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function cameraStartRear() { 
    frontCamera = false 
    var constraints = { video: { facingMode: "environment" }, audio: false };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

cameraSwitch.onclick = function() {
    track.stop();

    SwitchCamera();
    cameraStart1();

   
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStartFront, false);