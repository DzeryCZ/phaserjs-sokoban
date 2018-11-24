namespace Configuration.Levels.Level1 {

    export const Grid: number[][] = [
        [Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty],
        [Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.box, Configuration.Role.empty, Configuration.Role.wall],
        [Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.wall],
        [Configuration.Role.box, Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.box, Configuration.Role.wall],
        [Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty],
        [Configuration.Role.destination, Configuration.Role.destination, Configuration.Role.destination, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty]
    ]

    export const Player: Interface.Configuration.Position = {
        'x': 0,
        'y': 0
    }
}