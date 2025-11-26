(() => {
    const game = document.getElementById("game") as (HTMLCanvasElement | null);

    if(game === null){
        throw new Error("No canvas with id 'game' is found");

    }
    const ctx = game?.getContext("2d");
    if(ctx === null){
        throw new Error("2D context is not supported");
    }
    console.log(ctx);
})()
