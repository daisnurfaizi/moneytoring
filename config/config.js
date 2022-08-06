require('dotenv').config();

const{
DBHost,
Host,
Port,
DBUsername,
DBPassword,
DBName,
DBDialect
}=process.env;
module.exports = {

  "development": {
    "Host": Host,
    "Port": Port,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  },
  "test": {
    "Host": Host,
    "Port": Port,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  },
  "production": {
    "Host": Host,
    "Port": Port,
    "username": DBUsername,
    "password": DBPassword,
    "database": DBName,
    "host": DBHost,
    "dialect": DBDialect
  }
}

