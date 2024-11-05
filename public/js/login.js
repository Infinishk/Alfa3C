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
    const canvas = document.getElementById("circle-background");
    const ctx = canvas.getContext("2d");
    let circles = [];

    // Resize canvas to fill the browser window dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Circle properties and animation setup
    class Circle {
        constructor(x, y, radius, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx; // Velocity in x-direction
            this.dy = dy; // Velocity in y-direction
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Reverse direction when the circle hits the edge of the canvas
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    // Generate random circles
    function initCircles() {
        circles = [];
        for (let i = 0; i < 20; i++) {
            let radius = Math.random() * 60 + 30; 
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * (canvas.height - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * 0.5; // Slow down speed
            let dy = (Math.random() - 0.5) * 0.5; // Slow down speed
            let color = '#dfdfdc'; // Set the circle color to #dfdfdc
            circles.push(new Circle(x, y, radius, dx, dy, color));
        }
    }
    

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(circle => circle.update());
    }

    initCircles();
    animate();
});

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

