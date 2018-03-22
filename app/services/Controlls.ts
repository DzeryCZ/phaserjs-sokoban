namespace Services {
    export class Controlls {

        private controlls: Phaser.Key[] = [];

        constructor(private game: Phaser.Game, private level: Services.Level) {
            this.initializeKeys(Configuration.Controlls);
        }

        private initializeKeys(controllsConfig: Interface.Configuration.Controlls): void {

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
            
            
        }

        public keyPress(e: Phaser.Key): void {
            this.level.move('moveRight');
        }


    }
}