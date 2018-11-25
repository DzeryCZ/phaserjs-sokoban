namespace Services {
    export class Level {

        private grid: number[][];
        private player: Interface.Configuration.Position;

        constructor(private game: Phaser.Game, private render: Services.Render) {
            this.loadMultiple(Configuration.Sprites);
        }

        public init(grid: number[][], player: Interface.Configuration.Position): void {
            this.grid = grid;
            this.player = player;

            this.update([0, 0], this.player, Configuration.Role.player);
        }

        public move(action: string) {
            eval("this."+action+"()");
        }

        private moveUp(): void {
            this.update([-1, 0],this.player, Configuration.Role.player);
        }

        private moveDown(): void {
            this.update([1, 0], this.player, Configuration.Role.player);
            // this.player.y = this.player.y + 1;
        }

        private moveLeft(): void {
            this.update([0, -1], this.player, Configuration.Role.player);
        }

        private moveRight(): void {
            this.update([0, 1], this.player, Configuration.Role.player);
        }

        /**
         * @todo change vector to object instead of using array indexes
         * @todo make it more readable
         * @param vector 
         */
        private update(vector: Array<number>, position: Interface.Configuration.Position, item: number): boolean {
            const oldPosition = JSON.parse(JSON.stringify(position)); // @todo Heper function
            position.y = position.y + vector[0];
            position.x = position.x + vector[1];

            // if (position.y < 0 || position.y > 5 || position.x < 0 || position.x > 7) {
            //     position.y = position.y - vector[0];
            //     position.x = position.x - vector[1];
            //     return false;
            // }

            switch (this.grid[position.y][position.x]) {
                case Configuration.Role.wall:
                    position.y = position.y - vector[0];
                    position.x = position.x - vector[1];
                    return false;
                case Configuration.Role.box:
                    const boxPosition = JSON.parse(JSON.stringify(position)); // @todo Heper function
                    if (!this.update(vector, boxPosition, Configuration.Role.box)) {
                        position.y = position.y - vector[0];
                        position.x = position.x - vector[1];
                    }
                    console.log('box'); 
                    break;
            }

            this.grid[oldPosition.y][oldPosition.x] = Configuration.Role.empty; // @todo update with original tile
            this.grid[position.y][position.x] = item;
            this.render.render(this.grid);

            return true;
        }

        // @todo MOVE TO Service.sprint or assets
        private baseUri: string = 'assets/sprites/';

        /**
         * @todo Move to Service.Sprint
         * @param assets
         */
        public loadMultiple(assets: string[]): void {
            for (var gridIndex in Configuration.Sprites) {
                this.loadOne(Configuration.Sprites[gridIndex]);
            }
        }

        /**
         * @todo Move to Service.Sprint
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