function fwheelSpin(){
    const pattern = document.querySelector(".wheel-pattern");
    const angle = (720 + Math.random() * 1440);
    pattern.style.rotate = "" + angle + "deg";

    if (Math.floor(angle/18) % 2 == 0){
        document.querySelector(".fwheel-winner").innerHTML = "red";
    }else{
        document.querySelector(".fwheel-winner").innerHTML = "black";
    }
}