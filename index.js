"use strict";
(() => {
    const game = document.getElementById("game");
    if (game === null) {
        throw new Error("No canvas with id 'game' is found");
    }
    const ctx = game === null || game === void 0 ? void 0 : game.getContext("2d");
    if (ctx === null) {
        throw new Error("2D context is not supported");
    }
    console.log(ctx);
})();
