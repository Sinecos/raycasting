"use strict";
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(that) {
        return new Vector2(this.x + that.x, this.y + that.y);
    }
    sub(that) {
        return new Vector2(this.x - that.x, this.y - that.y);
    }
    div(that) {
        return new Vector2(this.x / that.x, this.y / that.y);
    }
    mul(that) {
        return new Vector2(this.x * that.x, this.y * that.y);
    }
    lenght() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    norm() {
        const l = this.lenght();
        if (l == 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / l, this.y / l);
    }
    scale(value) {
        return new Vector2(this.x * value, this.y * value);
    }
    array() {
        return [this.x, this.y];
    }
}
const GRID_ROWS = 10;
const GRID_COLS = 10;
const GRID_SIZE = new Vector2(GRID_COLS, GRID_ROWS);
function canvasSize(ctx) {
    return new Vector2(ctx.canvas.width, ctx.canvas.height);
}
function fillCircle(ctx, center, radius) {
    ctx.beginPath();
    ctx.arc(...center.array(), 0.2, 0, 2 * Math.PI);
    ctx.fill();
}
function strokeLine(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(...p1.array());
    ctx.lineTo(...p2.array());
    ctx.stroke();
}
function rayStep(p1, p2) {
    // p2.sub(p1).norm() is direction with lengh of 1 and add p2
    return p2.sub(p1).norm().add(p2);
}
function grid(ctx, p2) {
    ctx.reset();
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, ...canvasSize(ctx).array());
    ctx.scale(ctx.canvas.width / GRID_COLS, ctx.canvas.height / GRID_ROWS);
    ctx.lineWidth = 0.02;
    ctx.strokeStyle = "#303030";
    for (let x = 0; x <= GRID_COLS; ++x) {
        strokeLine(ctx, new Vector2(x, 0), new Vector2(x, GRID_ROWS));
    }
    for (let y = 0; y <= GRID_ROWS; ++y) {
        strokeLine(ctx, new Vector2(0, y), new Vector2(GRID_COLS, y));
    }
    const p1 = new Vector2(GRID_COLS * 0.43, GRID_ROWS * 0.33);
    ctx.fillStyle = "magenta";
    fillCircle(ctx, p1, 0.2);
    if (p2 !== undefined) {
        fillCircle(ctx, p2, 0.2);
        ctx.strokeStyle = "magenta";
        strokeLine(ctx, p1, p2);
        const p3 = rayStep(p1, p2);
        fillCircle(ctx, p3, 0.2);
        strokeLine(ctx, p2, p3);
    }
}
(() => {
    const game = document.getElementById("game");
    if (game === null) {
        throw new Error("No canvas with id 'game' is found");
    }
    game.width = 800;
    game.height = 800;
    const ctx = game === null || game === void 0 ? void 0 : game.getContext("2d");
    if (ctx === null) {
        throw new Error("2D context is not supported");
    }
    let p2 = undefined;
    game.addEventListener("mousemove", (event) => {
        p2 = new Vector2(event.offsetX, event.offsetY)
            .div(canvasSize(ctx)) // value x: 0 to 1 and y: 0 to 1
            .mul(GRID_SIZE); // value x: 0 to 10 and y: 0 to 10
        grid(ctx, p2);
    });
    grid(ctx, p2);
})();
