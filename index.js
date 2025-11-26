"use strict";
const GRID_ROWS = 10;
const GRID_COLS = 10;
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
    const cell_width = ctx.canvas.width / GRID_COLS;
    const cell_height = ctx.canvas.height / GRID_ROWS;
    ctx.strokeStyle = "#303030";
    for (let x = 0; x <= GRID_COLS; ++x) {
        ctx.moveTo(x * cell_width, 0);
        ctx.lineTo(x * cell_width, ctx.canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= GRID_ROWS; ++y) {
        ctx.moveTo(0, cell_height * y);
        ctx.lineTo(ctx.canvas.width, y * cell_height);
        ctx.stroke();
    }
    console.log(ctx);
})();
