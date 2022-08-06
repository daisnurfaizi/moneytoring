require('dotenv').config();

const{
DBHost,
Host,
PORT,
DBUsername,
DBPassword,
DBName,
DBDialect
}=process.env;
module.exports = {

  "development": {
    "Host": Host,
    "PORT": PORT,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  },
  "test": {
    "Host": Host,
    "PORT": PORT,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  },
  "production": {
    "Host": Host,
    "PORT": PORT,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  }
}

