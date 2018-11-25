namespace Services {
    export class Sprite {
        private baseUri: string = 'assets/sprites/';

        constructor(private game: Phaser.Game) {}

        /**
         * @param assets
         */
        public loadMultiple(assets: string[]): void {
            for (var gridIndex in Configuration.Sprites) {
                this.loadOne(Configuration.Sprites[gridIndex]);
            }
        }

        /**
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