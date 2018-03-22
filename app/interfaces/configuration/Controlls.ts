namespace Interface.Configuration {

    export interface Controlls {
        'moveUp': number,
        'moveDown': number,
        'moveLeft': number,
        'moveRight': number,
        [key: string]: number
    }
}