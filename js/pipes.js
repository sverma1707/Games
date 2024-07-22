class Pipes {
    constructor(canvas) {
        this.canvas = canvas;
        this.pipeWidth = 80;
        this.pipeGap = 220;
        this.pipeSpeed = 2;
        this.pipes = [];
        this.frameCount = 0;

        // Load the pipe image
        this.image = new Image();
        this.image.src = 'images/pipe2.png';
    }

    draw(ctx) {
        this.pipes.forEach(pipe => {
            // Draw top pipe
            ctx.drawImage(this.image, pipe.x, 0, this.pipeWidth, pipe.top);
            // Draw bottom pipe
            ctx.drawImage(this.image, pipe.x, pipe.bottom, this.pipeWidth, this.canvas.height - pipe.bottom);
        });
    }

    update() {
        this.pipes.forEach(pipe => {
            pipe.x -= this.pipeSpeed;
        });
        if (this.frameCount % 100 === 0) {
            let top = Math.random() * (this.canvas.height / 2);
            let bottom = top + this.pipeGap;
            this.pipes.push({ x: this.canvas.width, top: top, bottom: bottom });
        }
        this.pipes = this.pipes.filter(pipe => pipe.x + this.pipeWidth > 0);
        this.frameCount++;
    }

    detectCollision(bird) {
        for (let pipe of this.pipes) {
            if (bird.x < pipe.x + this.pipeWidth && bird.x + bird.width > pipe.x &&
                (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)) {
                return true;
            }
        }
        return false;
    }
}
