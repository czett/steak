document.addEventListener("DOMContentLoaded", function() {
    const ball = document.querySelector('.ball');
    const betButton = document.querySelector('#betButton');
    const popup = document.querySelector(".change-popup");
    
    let ballPosition = 0; // Start position of the ball
    let intervalId;
    
    function plinko() {
        const risk = parseInt(document.querySelector('#plinko-risk').value);
        const bet = parseInt(document.querySelector('#plinko-bet').value);
        console.log("Plinko function triggered");
        betButton.disabled = true;
        popup.classList.remove("popup-plinko-animated");

        // Prevent multiple balls from rolling simultaneously
        if (intervalId) {
            clearInterval(intervalId);
        }

        ballPosition = 0; // Reset ball position
        let direction = Math.random() < 0.5 ? -1 : 1; // Random direction (left or right)

        intervalId = setInterval(() => {
            if (Math.random() < 0.5) {
                direction *= -1; // Change direction randomly
            }

            ballPosition += 5; // Move the ball downward

            const currentLeft = parseFloat(getComputedStyle(ball).left);
            let newLeft = currentLeft + direction * 10; // Move the ball left or right

            // Limit the ball's movement to the canvas area
            const parentWidth = ball.parentElement.clientWidth;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > parentWidth - ball.clientWidth) {
                newLeft = parentWidth - ball.clientWidth;
            }

            // Set the new position of the ball
            ball.style.top = ballPosition + 'px';
            ball.style.left = newLeft + 'px';

            // If the ball reaches the bottom
            if (ballPosition >= ball.parentElement.clientHeight - ball.clientHeight) {
                clearInterval(intervalId);

                // Calculate the deviation from the center (-1 to 1)
                const ballCenter = newLeft + (ball.clientWidth / 2); // Center of the ball
                const canvasCenter = parentWidth / 2; // Center of the canvas
                const deviation = (ballCenter - canvasCenter) / (parentWidth / 2);

                console.log("Ball reached the bottom");

                const outcome = (2 * deviation.toFixed(2)) ** risk;

                console.log("Deviation from center (scale -1 to 1):", deviation.toFixed(2)); // Output deviation
                console.log(outcome);
                console.log(risk);
                
                popup.innerHTML = (((bet * Math.abs(outcome)) - 100)).toFixed(2) + "$";
                
                // Make the popup visible and trigger fade-in animation
                popup.style.visibility = "visible"; // Ensure visibility
                popup.classList.add("popup-plinko-animated");

                // Set a timeout to fade-out the popup after a delay
                setTimeout(() => {
                    popup.classList.remove("popup-plinko-animated");
                }, 2000); // After 4 seconds, fade out
                
                betButton.disabled = false;
            }
        }, 10); // 100ms for each step
    }

    // Add the click event listener to the button
    betButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        plinko(); // Start the Plinko game
    });
});
