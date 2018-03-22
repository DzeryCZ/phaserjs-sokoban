namespace Configuration.Levels.Level1 {

    export const Grid: number[][] = [
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 2, 0, 1],
        [0, 0, 1, 0, 0, 1],
        [2, 0, 1, 0, 2, 1],
        [0, 0, 0, 0, 0, 0],
        [3, 3, 3, 0, 0, 0]
    ]

    export const Player: Interface.Configuration.Player = {
        'x': 0,
        'y': 0
    }
}