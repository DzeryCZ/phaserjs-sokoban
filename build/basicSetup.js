/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>
var Game = /** @class */ (function () {
    function Game(width, height) {
        var _this = this;
        this.preload = function () {
            _this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            _this.game.scale.pageAlignHorizontally = true;
            _this.game.scale.pageAlignVertically = true;
            _this.renderService = new Services.Render(_this.game, Configuration.Sprites);
            _this.level = new Services.Level(_this.game, _this.renderService);
            new Services.Controlls(_this.game, _this.level);
        };
        this.create = function () {
            _this.level.init(Configuration.Levels.Level1.Grid, Configuration.Levels.Level1.Player);
        };
        this.update = function () {
            // nothing
        };
        this.game = new Phaser.Game(width, height, Phaser.AUTO, 'Game', {
            preload: this.preload,
            create: this.create,
        });
    }
    return Game;
}());
window.onload = function () {
    var game = new Game(600, 600);
};
var Configuration;
(function (Configuration) {
    Configuration.Controlls = {
        'moveUp': Phaser.Keyboard.UP,
        'moveDown': Phaser.Keyboard.DOWN,
        'moveLeft': Phaser.Keyboard.LEFT,
        'moveRight': Phaser.Keyboard.RIGHT
    };
})(Configuration || (Configuration = {}));
var Configuration;
(function (Configuration) {
    Configuration.Sprites = [
        'floor',
        'wall',
        'box',
        'place',
        'player' //4
    ];
})(Configuration || (Configuration = {}));
var Services;
(function (Services) {
    var Controlls = /** @class */ (function () {
        function Controlls(game, level) {
            this.game = game;
            this.level = level;
            this.controlls = [];
            this.initializeKeys(Configuration.Controlls);
        }
        Controlls.prototype.initializeKeys = function (controllsConfig) {
            this.controlls[0] = this.game.input.keyboard.addKey(controllsConfig['moveUp']);
            this.controlls[0].onUp.add(Services.Controlls.prototype.keyPress, this);
            this.controlls[1] = this.game.input.keyboard.addKey(controllsConfig['down']);
            this.controlls[1].onUp.add(Services.Controlls.prototype.keyPress, this);
            this.controlls[2] = this.game.input.keyboard.addKey(controllsConfig['left']);
            this.controlls[2].onUp.add(Services.Controlls.prototype.keyPress, this);
            this.controlls[3] = this.game.input.keyboard.addKey(controllsConfig['right']);
            this.controlls[3].onUp.add(Services.Controlls.prototype.keyPress, this);
            // TODO - zmenit interface, z ojektu klaves, na list - kazda kavesa by mohla mit vlastni callback
            //for (let key in controllsConfig) {
            //    this.controlls[key] = this.game.input.keyboard.addKey(controllsConfig[key]);
            //    this.controlls[key].onUp.add(Services.Controlls.prototype.keyPress, this);
            //}
        };
        Controlls.prototype.keyPress = function (e) {
            this.level.move('moveRight');
        };
        return Controlls;
    }());
    Services.Controlls = Controlls;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var Level = /** @class */ (function () {
        function Level(game, render) {
            this.game = game;
            this.render = render;
            // MOVE TO Service.sprint or assets
            this.baseUri = 'assets/sprites/';
            this.loadMultiple(Configuration.Sprites);
        }
        Level.prototype.init = function (grid, player) {
            this.grid = grid;
            this.player = player;
            this.update();
        };
        Level.prototype.move = function (action) {
            console.log(action);
            // todo defensive programing    
            this['moveRight']();
        };
        Level.prototype.moveUp = function () {
            this.player.y--;
            this.update();
        };
        Level.prototype.moveDown = function () {
            this.player.y++;
            this.update();
        };
        Level.prototype.moveLeft = function () {
            this.player.x--;
            this.update();
        };
        Level.prototype.moveRight = function () {
            this.player.x++;
            this.update();
        };
        Level.prototype.update = function () {
            var finalGrid = JSON.parse(JSON.stringify(this.grid));
            // todo - implement collision method, return updated grid (with or without changes)
            finalGrid[this.player.y][this.player.x] = 4;
            this.render.render(finalGrid);
        };
        /**
         * @todo Nove to Service.Sprint
         * @param assets
         */
        Level.prototype.loadMultiple = function (assets) {
            for (var gridIndex in Configuration.Sprites) {
                this.loadOne(Configuration.Sprites[gridIndex]);
            }
        };
        /**
         * @todo Nove to Service.Sprint
         * @param assetName
         */
        Level.prototype.loadOne = function (assetName) {
            this.game.load.image(assetName, this.baseUri + assetName + '.png');
        };
        return Level;
    }());
    Services.Level = Level;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var Render = /** @class */ (function () {
        function Render(game, gridConfiguration) {
            this.game = game;
            this.gridConfiguration = gridConfiguration;
            this.level = [];
            // nothing to do
        }
        Render.prototype.render = function (gridDefinition) {
            var _this = this;
            gridDefinition.forEach(function (column, rowNumber) {
                _this.level[rowNumber] = [];
                column.forEach(function (item, collumnNumber) {
                    var spriteName = _this.gridConfiguration[item];
                    var xAxe = 100 * collumnNumber;
                    var yAxe = 100 * rowNumber;
                    _this.level[rowNumber][collumnNumber] = _this.game.add.sprite(xAxe, yAxe, spriteName);
                });
            });
        };
        return Render;
    }());
    Services.Render = Render;
})(Services || (Services = {}));
var Configuration;
(function (Configuration) {
    var Levels;
    (function (Levels) {
        var Level1;
        (function (Level1) {
            Level1.Grid = [
                [0, 1, 0, 0, 0, 0],
                [0, 1, 0, 2, 0, 1],
                [0, 0, 1, 0, 0, 1],
                [2, 0, 1, 0, 2, 1],
                [0, 0, 0, 0, 0, 0],
                [3, 3, 3, 0, 0, 0]
            ];
            Level1.Player = {
                'x': 0,
                'y': 0
            };
        })(Level1 = Levels.Level1 || (Levels.Level1 = {}));
    })(Levels = Configuration.Levels || (Configuration.Levels = {}));
})(Configuration || (Configuration = {}));
