
namespace Configuration.Levels.Level2 {
    export const Grid: number[][] = [
        [Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty],
        [Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.empty],
        [Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.wall, Configuration.Role.box, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall],
        [Configuration.Role.wall, Configuration.Role.empty, Configuration.Role.box, Configuration.Role.empty, Configuration.Role.destination, Configuration.Role.destination, Configuration.Role.wall],
        [Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall, Configuration.Role.wall]
    ]

    export const Player: Interface.Configuration.Position = {
        'x': 1,
        'y': 1
    }
}