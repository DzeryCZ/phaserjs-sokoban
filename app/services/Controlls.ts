namespace Services {
    export class Controlls {

        private controlls: Phaser.Key[] = [];

        constructor(private game: Phaser.Game, private level: Services.Level) {
            this.initializeKeys(Configuration.Controlls);
        }

        private initializeKeys(controllsConfig: Interface.Configuration.Controlls): void {
            // TODO - zmenit interface, z ojektu klaves, na list - kazda kavesa by mohla mit vlastni callback
            let index: number = 0;
            for (let command in controllsConfig) {
               this.controlls[index] = this.game.input.keyboard.addKey(controllsConfig[command]);
               this.controlls[index].onUp.add(Services.Controlls.prototype.keyPress, this, 1, command);
               index++;
            }
        }

        public keyPress(e: Phaser.Key, command: any): void {
            this.level.move(command);
        }
    }
}