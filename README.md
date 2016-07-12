# AirBin - PasteBin replica


### Installation

You need to install all of the dependencies from NPM:

```sh
$ npm install
```

### Testing

```code
$ npm test
```

### Running on Development Enviroment

```code
$ npm start
```

### Building Docker image

You need to install all of the dependencies from NPM:

```sh
$ docker build -t Airbin .
```

### Starting Docker container

```sh
docker run --name airbin01 -d -p 8080 AirBin
```

### Todos

 - Add Webpack
 - Add Angular2
 - Add 'gulp build:development' and 'gulp build:production' to build pubic
 - Add Typings
 - Add CONTRIBUTING.md guidance
 - Add Code Comments
 - Rewrite Tests using promises
 - Code refractoring
 - Use gulp for minification, scss compilation and watching. Add live reload.
