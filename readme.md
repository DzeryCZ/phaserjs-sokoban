# Install Nodejs, NPM (Ubuntu)
    
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

# Gulp, Typescript

    npm install -g gulp-cli
    npm install gulp
    npm install gulp-typescript typescript

# Http server

    npm install -g http-server

# Run

## Compile Typescript

    gulp watch

## Run http server

    http-server . -c-1 -o


## TODO
- Config.Controlls - prehodit klic a value - nutna zmena/redukce interface
- Rozdelit Config.level na 3 vrstvy background, bedny a playera - vrstvy se budou skladat dohromady v Service.level


## After Future
- Travis CI
- Unit tests 
- Git hook - unit tests
- vytvorit cli pro 'compile ts' a 'run server' 