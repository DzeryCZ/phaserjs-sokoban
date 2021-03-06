/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>

class Game {

    private game: Phaser.Game;

    private level: Services.Level;

    private sprite: Services.Sprite;

    private renderService: Services.Render;

    constructor(width: number, height: number) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO, 'Game', 
    { 
        preload: this.preload, 
        create: this.create
    });
    }

    preload = () => {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.sprite = new Services.Sprite(this.game);
        this.renderService = new Services.Render(this.game, Configuration.Sprites);
        this.level = new Services.Level(this.game, this.renderService, this.sprite);
        new Services.Controlls(this.game, this.level);
    }

    create = () => {
        this.level.init(Configuration.Levels.Level1.Grid, Configuration.Levels.Level1.Player);
    }
}

window.onload = () => {
  var game = new Game(600, 600);
}