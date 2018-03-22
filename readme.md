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
