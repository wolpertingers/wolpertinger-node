# <img src="logo.png" width="100"/> Wolpertinger
### Microservice to order custom shirts :shirt:
This is the Node.js backend for the wolpertinger project.

## Project setup
The project is built with npm.

### Environment variables
- `MYSQL_DATABASE`: name of the mariadb database to use
- `MYSQL_ROOT_PASSWORD`: password for the database root user
- `ADMIN_NAME`: name of the admin user for this webservice (tokens)
- `ADMIN_PASSWORD`: password of the admin user
- `IMAGE_SERVER_URL`: address of the apache http server with the images

### Development mode
in `wolpertinger-node/app` run:

```
npm run dev
```

### Deploy app in docker
```
docker-compose up --build -d
```