namespace Services {

    export class Render {

        protected level: Phaser.Sprite[][] = [];

        constructor(
            private game: Phaser.Game,
            private gridConfiguration: string[]
        ) {
            // nothing to do
        }

        public render(gridDefinition: number[][]): void {

            gridDefinition.forEach((column, rowNumber) => {
                this.level[rowNumber] = [];
                column.forEach((item, collumnNumber) => {

                    let spriteName: string = this.gridConfiguration[item];
                    let xAxe = 100 * collumnNumber;
                    let yAxe = 100 * rowNumber;
                    this.level[rowNumber][collumnNumber] = this.game.add.sprite(xAxe, yAxe, spriteName);
                });
            });
        }
    }
}