class Pipes {
    constructor(canvas) {
        this.canvas = canvas;
        this.pipeWidth = 80;
        this.pipeGap = 220;
        this.pipeSpeed = 4;
        this.pipes = [];
        this.frameCount = 0;
        this.pipeCount = -4;

        // Load the pipe image
        this.bottom = new Image();
        this.bottom.src = 'images/pipe7.png';
        this.top = new Image();
        this.top.src = 'images/pipe6.png';
    }

    draw(ctx) {
        this.pipes.forEach(pipe => {
            // Draw top pipe
            ctx.drawImage(this.top, pipe.x, 0, this.pipeWidth, pipe.top);
            // Draw bottom pipe
            ctx.drawImage(this.bottom, pipe.x, pipe.bottom, this.pipeWidth, this.canvas.height - pipe.bottom);
        });
    }

    update() {
        this.pipes.forEach(pipe => {
            pipe.x -= this.pipeSpeed;
        });
        if (this.frameCount % 100 === 0) {
            let top = Math.random() * (this.canvas.height / 2);
            let bottom = top + this.pipeGap;
            this.pipeCount++;
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
