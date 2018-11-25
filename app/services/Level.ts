namespace Services {
    export class Level {

        private grid: number[][];
        private player: Interface.Configuration.Position;

        constructor(private game: Phaser.Game, private render: Services.Render, private sprite: Services.Sprite) {
            this.sprite.loadMultiple(Configuration.Sprites);
        }

        public init(grid: number[][], player: Interface.Configuration.Position): void {
            this.grid = grid;
            this.player = player;

            let vector: Interface.Configuration.Vector = {
                'x': 0,
                'y': 0
            };
            this.update(vector, this.player, Configuration.Role.player);
        }

        public move(action: string) {
            eval("this."+action+"()");
        }

        private moveUp(): void {
            let vector: Interface.Configuration.Vector = {
                'x': 0,
                'y': -1
            };
            this.update(vector,this.player, Configuration.Role.player);
        }

        private moveDown(): void {
            let vector: Interface.Configuration.Vector = {
                'x': 0,
                'y': 1
            };
            this.update(vector, this.player, Configuration.Role.player);
        }

        private moveLeft(): void {
            let vector: Interface.Configuration.Vector = {
                'x': -1,
                'y': 0
            };
            this.update(vector, this.player, Configuration.Role.player);
        }

        private moveRight(): void {
            let vector: Interface.Configuration.Vector = {
                'x': 1,
                'y': 0
            };
            this.update(vector, this.player, Configuration.Role.player);
        }

         /**
          * @param vector 
          * @param position 
          * @param item 
          */
        private update(
            vector: Interface.Configuration.Vector, 
            position: Interface.Configuration.Position, 
            item: number
        ): boolean {
            const oldPosition: Interface.Configuration.Position = Helpers.Helper.cloneObject(position);
            position.y = position.y + vector.y;
            position.x = position.x + vector.x;

            switch (this.grid[position.y][position.x]) {
                case Configuration.Role.wall:
                    this.returnBack(vector, position);
                    return false;
                case Configuration.Role.box:
                    if (item !== Configuration.Role.player) {
                        this.returnBack(vector, position);
                        return false;
                    }
                    const boxPosition: Interface.Configuration.Position = Helpers.Helper.cloneObject(position);
                    if (!this.update(vector, boxPosition, Configuration.Role.box)) {
                        this.returnBack(vector, position);
                    }
                    break;
            }

            this.grid[oldPosition.y][oldPosition.x] = Configuration.Role.empty;
            this.grid[position.y][position.x] = item;

            this.render.render(this.grid);

            return true;
        }

        /**
         * @param vector 
         * @param position 
         */
        private returnBack(vector: Interface.Configuration.Vector, position: Interface.Configuration.Position) {
            position.y = position.y - vector.y;
            position.x = position.x - vector.x;
        }
    }
}