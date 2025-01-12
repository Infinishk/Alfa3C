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
    let rectangles = [];
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
            let radius = Math.random() * 100 + 120;
            let x = Math.random() * (backgroundCanvas.width - radius * 2) + radius;
            let y = Math.random() * (backgroundCanvas.height - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * 0.5;
            let dy = (Math.random() - 0.5) * 0.5;
            let color = '#dfdfdc';
            circles.push(new Circle(x, y, radius, dx, dy, color));
        }
    }

    class Rectangle {
        constructor(x, y, size, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }
    
        draw(ctx, colorOverride = null) {
            const cornerRadius = this.size * 0.1;
            const width = this.size;
            const height = this.size / 2;
    
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + cornerRadius);
            ctx.arcTo(this.x, this.y + height, this.x + cornerRadius, this.y + height, cornerRadius);
            ctx.lineTo(this.x + width - cornerRadius, this.y + height);
            ctx.arcTo(this.x + width, this.y + height, this.x + width, this.y + height - cornerRadius, cornerRadius);
            ctx.lineTo(this.x + width, this.y + cornerRadius);
            ctx.arcTo(this.x + width, this.y, this.x + width - cornerRadius, this.y, cornerRadius);
            ctx.lineTo(this.x + cornerRadius, this.y);
            ctx.arcTo(this.x, this.y, this.x, this.y + cornerRadius, cornerRadius);
            ctx.closePath();
    
            ctx.fillStyle = colorOverride || this.color;
            ctx.fill();
        }
    
        update() {
            if (this.x + this.size > backgroundCanvas.width || this.x < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.size / 2 > backgroundCanvas.height || this.y < 0) {
                this.dy = -this.dy;
            }
    
            this.x += this.dx;
            this.y += this.dy;
        }
    }
    
    function initRectangles() {
        rectangles = [];
        for (let i = 0; i < 1; i++) {
            let size = Math.random() * 50 + 600;
            let x = Math.random() * (backgroundCanvas.width - size);
            let y = Math.random() * (backgroundCanvas.height - size / 2);
            let dx = (Math.random() - 0.5) * 0.5;
            let dy = (Math.random() - 0.5) * 0.5;
            let color = '#dfdfdc';
            rectangles.push(new Rectangle(x, y, size, dx, dy, color));
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
    
        // Draw rectangles on the background canvas
        rectangles.forEach(rectangle => {
            rectangle.update();
            rectangle.draw(bgCtx);
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
    
        // Draw only intersecting parts of rectangles on the foreground canvas
        rectangles.forEach(rectangle => {
            const rect = blueContainer.getBoundingClientRect();
            const isIntersecting = (
                rectangle.x + rectangle.size > rect.left &&
                rectangle.x < rect.right &&
                rectangle.y + rectangle.size / 2 > rect.top &&
                rectangle.y < rect.bottom
            );
    
            if (isIntersecting) {
                fgCtx.save();
                fgCtx.translate(-rect.left, -rect.top);
                fgCtx.beginPath();
                rectangle.draw(fgCtx);
                fgCtx.clip();
                rectangle.draw(fgCtx, "#dbb160");
                fgCtx.restore();
            }
        });
    }

    initCircles();
    initRectangles();
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