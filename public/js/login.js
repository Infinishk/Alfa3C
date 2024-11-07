function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const toggleCheckbox = document.getElementById("toggle-password");
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener("click", function () {
            togglePassword("password");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Background canvas
    const backgroundCanvas = document.getElementById("circle-background");
    const bgCtx = backgroundCanvas.getContext("2d");

    // Foreground canvas for the blue container
    const blueContainerCanvas = document.createElement("canvas");
    blueContainerCanvas.style.position = "absolute";
    blueContainerCanvas.style.top = "0";
    blueContainerCanvas.style.left = "0";
    blueContainerCanvas.style.pointerEvents = "none";
    document.querySelector(".graphic-container").appendChild(blueContainerCanvas);

    const fgCtx = blueContainerCanvas.getContext("2d");

    let circles = [];
    const blueContainer = document.querySelector(".graphic-container");

    function resizeCanvas() {
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;

        // Set the foreground canvas size to match the blue container
        const rect = blueContainer.getBoundingClientRect();
        blueContainerCanvas.width = rect.width;
        blueContainerCanvas.height = rect.height;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Circle {
        constructor(x, y, radius, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.originalColor = color;
            this.color = color;
        }

        draw(ctx, colorOverride = null) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = colorOverride || this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.radius > backgroundCanvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > backgroundCanvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            // Check if the circle is intersecting with the blue container
            const rect = blueContainer.getBoundingClientRect();
            const isIntersecting = (
                this.x + this.radius > rect.left &&
                this.x - this.radius < rect.right &&
                this.y + this.radius > rect.top &&
                this.y - this.radius < rect.bottom
            );

            return isIntersecting;
        }
    }

    function initCircles() {
        circles = [];
        for (let i = 0; i < 3; i++) {
            let radius = Math.random() * 120 + 60;
            let x = Math.random() * (backgroundCanvas.width - radius * 2) + radius;
            let y = Math.random() * (backgroundCanvas.height - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * 0.5;
            let dy = (Math.random() - 0.5) * 0.5;
            let color = '#dfdfdc';
            circles.push(new Circle(x, y, radius, dx, dy, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        
        // Clear the background and foreground canvases
        bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        fgCtx.clearRect(0, 0, blueContainerCanvas.width, blueContainerCanvas.height);

        // Draw circles on the background canvas
        circles.forEach(circle => {
            circle.update();
            circle.draw(bgCtx);
        });

        // Draw only intersecting parts of circles on the foreground canvas
        circles.forEach(circle => {
            const rect = blueContainer.getBoundingClientRect();
            const isIntersecting = (
                circle.x + circle.radius > rect.left &&
                circle.x - circle.radius < rect.right &&
                circle.y + circle.radius > rect.top &&
                circle.y - circle.radius < rect.bottom
            );

            if (isIntersecting) {
                fgCtx.save();
                fgCtx.translate(-rect.left, -rect.top);
                fgCtx.beginPath();
                fgCtx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
                fgCtx.clip();
                circle.draw(fgCtx, "#dbb160");
                fgCtx.restore();
            }
        });
    }

    initCircles();
    animate();
});

// Password toggle with eye icon
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.getElementById("toggle-password-icon");

    if (togglePasswordIcon) {
        togglePasswordIcon.addEventListener("click", function () {
            const isPasswordVisible = passwordInput.type === "text";
            passwordInput.type = isPasswordVisible ? "password" : "text";
            togglePasswordIcon.classList.toggle("fa-eye", isPasswordVisible);
            togglePasswordIcon.classList.toggle("fa-eye-slash", !isPasswordVisible);
        });
    }
});