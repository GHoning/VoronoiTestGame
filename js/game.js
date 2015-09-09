
/* Game namespace */
var game = {

    // an object where to store game information
    data : {

    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(100, 100, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        //add audio
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        this.menu = new game.Menu();
        this.play = new game.PlayScreen();

        me.state.set(me.state.PLAY, this.play);

        // Start the game.
        me.state.change(me.state.PLAY);
    },
};
