## Description

API REST que lleva el core para el proyecto de ejemplo para la gestión de automóviles

## Instalación de Librerías

```bash
$ npm install
```

## Corriendo el app

- Necesitarás crear un .env file en la carpeta root con el string de conexión a una BD de mongo ``MONGODB_CONNECTION_STRING``

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Corriendo los tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

