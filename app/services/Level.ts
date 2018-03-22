namespace Services {
    export class Level {

        private grid: number[][];
        private player: Interface.Configuration.Player;

        constructor(private game: Phaser.Game, private render: Services.Render) {
            this.loadMultiple(Configuration.Sprites);
        }

        public init(grid: number[][], player: Interface.Configuration.Player): void {
            this.grid = grid;
            this.player = player;

            this.update();
        }

        public move(action: string) {
            console.log(action);
            // todo defensive programing    
            this['moveRight']();
        }


        private moveUp(): void {
            this.player.y--;
            this.update();
        }

        private moveDown(): void {
            this.player.y++;
            this.update();
        }

        private moveLeft(): void {
            this.player.x--;
            this.update();
        }

        private moveRight(): void {
            this.player.x++;
            this.update();
        }

        private update(): void {
            let finalGrid = JSON.parse(JSON.stringify(this.grid));
            // todo - implement collision method, return updated grid (with or without changes)
            finalGrid[this.player.y][this.player.x] = 4;
            this.render.render(finalGrid);
        }






        // MOVE TO Service.sprint or assets
        private baseUri: string = 'assets/sprites/';

        /**
         * @todo Nove to Service.Sprint
         * @param assets
         */
        public loadMultiple(assets: string[]): void {
            for (var gridIndex in Configuration.Sprites) {
                this.loadOne(Configuration.Sprites[gridIndex]);
            }
        }

        /**
         * @todo Nove to Service.Sprint
         * @param assetName
         */
        public loadOne(assetName: string): void {
            this.game.load.image(
                assetName,
                this.baseUri + assetName + '.png'
            );
        }


    }
}