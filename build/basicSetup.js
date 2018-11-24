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
    Configuration.Role = {
        'empty': 0,
        'wall': 1,
        'box': 2,
        'destination': 3,
        'player': 4
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
            // TODO - zmenit interface, z ojektu klaves, na list - kazda kavesa by mohla mit vlastni callback
            var index = 0;
            for (var command in controllsConfig) {
                this.controlls[index] = this.game.input.keyboard.addKey(controllsConfig[command]);
                this.controlls[index].onUp.add(Services.Controlls.prototype.keyPress, this, 1, command);
                index++;
            }
        };
        Controlls.prototype.keyPress = function (e, command) {
            this.level.move(command);
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
            this.update([0, 0], this.player, Configuration.Role.player);
        };
        Level.prototype.move = function (action) {
            eval("this." + action + "()");
        };
        Level.prototype.moveUp = function () {
            this.update([-1, 0], this.player, Configuration.Role.player);
        };
        Level.prototype.moveDown = function () {
            this.update([1, 0], this.player, Configuration.Role.player);
            // this.player.y = this.player.y + 1;
        };
        Level.prototype.moveLeft = function () {
            this.update([0, -1], this.player, Configuration.Role.player);
        };
        Level.prototype.moveRight = function () {
            this.update([0, 1], this.player, Configuration.Role.player);
        };
        /**
         * @todo change vector to object instead of using array indexes
         * @param vector
         */
        Level.prototype.update = function (vector, position, item) {
            var oldPosition = JSON.parse(JSON.stringify(position)); // @todo Heper function
            position.y = position.y + vector[0];
            position.x = position.x + vector[1];
            if (position.y < 0 || position.y > 5 || position.x < 0 || position.x > 5) {
                position.y = position.y - vector[0];
                position.x = position.x - vector[1];
                return false;
            }
            switch (this.grid[position.y][position.x]) {
                case Configuration.Role.wall:
                    position.y = position.y - vector[0];
                    position.x = position.x - vector[1];
                    return false;
                case Configuration.Role.box:
                    var boxPosition = JSON.parse(JSON.stringify(position)); // @todo Heper function
                    if (!this.update(vector, boxPosition, Configuration.Role.box)) {
                        position.y = position.y - vector[0];
                        position.x = position.x - vector[1];
                    }
                    console.log('box');
                    break;
            }
            // let finalGrid = JSON.parse(JSON.stringify(this.grid));
            // todo - implement collision method, return updated grid (with or without change, Configuration.Role.players)
            this.grid[oldPosition.y][oldPosition.x] = Configuration.Role.empty; // @todo update with original tile
            this.grid[position.y][position.x] = item;
            this.render.render(this.grid);
            return true;
        };
        /**
         * @todo Move to Service.Sprint
         * @param assets
         */
        Level.prototype.loadMultiple = function (assets) {
            for (var gridIndex in Configuration.Sprites) {
                this.loadOne(Configuration.Sprites[gridIndex]);
            }
        };
        /**
         * @todo Move to Service.Sprint
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
                [Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty],
                [Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.box, Configuration.Role.empty, Configuration.Role.wall],
                [Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.wall],
                [Configuration.Role.box, Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.box, Configuration.Role.wall],
                [Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty],
                [Configuration.Role.destination, Configuration.Role.destination, Configuration.Role.destination, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty]
            ];
            Level1.Player = {
                'x': 0,
                'y': 0
            };
        })(Level1 = Levels.Level1 || (Levels.Level1 = {}));
    })(Levels = Configuration.Levels || (Configuration.Levels = {}));
})(Configuration || (Configuration = {}));
