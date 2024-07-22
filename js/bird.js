class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 50;
        this.y = 150;
        this.width = 40;
        this.height = 30;
        this.gravity = 0.4;
        this.lift = -5;
        this.velocity = 0;

        // Load the bird image
        this.image = new Image();
        this.image.src = 'images/bird.png';
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y + this.height > this.canvas.height) {
            this.y = this.canvas.height - this.height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    jump() {
        this.velocity = this.lift;
    }
}
