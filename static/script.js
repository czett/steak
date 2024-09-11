let plinkoSpeed = 1;
let plinkoMultiplier = 1;
let betBall = document.querySelector(".ball");
let betAmount = document.getElementById("plinko-bet").value;
let betRisk = document.getElementById("plinko-risk").value;
let canvas = document.querySelector(".canvas");

function plinko(){
    loop.start();
}

function plinkoGameplay(delay) {
    let intervalId;
  
    function start() {
        intervalId = setInterval(() => {
            betY = betBall.offsetTop;
            let containerHeight = canvas.clientHeight;
            betY = (betY / containerHeight) * 100;

            betX = betBall.offsetRight;
            let containerWidth = canvas.clientWidth;
            betX = (betY / containerWidth) * 100;

            betBall.style.transform = "translateX(" + (betX + (Math.random()-0.5)) + "%)";

            if (betY <= 100){
                betBall.style.top = (betY + plinkoSpeed) + "%";
            }
        }, delay);
    }
  
    function stop() {
        clearInterval(intervalId);
    }
  
    return {
        start,
        stop
    };
}

const loop = plinkoGameplay(30);
loop.start();
loop.stop();