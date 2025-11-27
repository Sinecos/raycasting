"use strict";
const GRID_ROWS = 10;
const GRID_COLS = 10;
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    array() {
        return [this.x, this.y];
    }
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
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
    const p2 = new Vector2(GRID_COLS * 0.33, GRID_ROWS * 0.43);
    ctx.fillStyle = "magenta";
    fillCircle(ctx, p1, 0.2);
    fillCircle(ctx, p2, 0.2);
    ctx.strokeStyle = "magenta";
    strokeLine(ctx, p1, p2);
})();
