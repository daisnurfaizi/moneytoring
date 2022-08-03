require('dotenv').config();

const{
DBHost,
Host,
DBUsername,
DBPassword,
DBName,
DBDialect
}=process.env;
module.exports = {

  "development": {
    "Host": Host,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  },
  "test": {
    "Host": Host,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  },
  "production": {
    "Host": Host,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  }
}

