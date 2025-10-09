require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_CONNECTION
} = process.env;

for (const key of [DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT, DB_CONNECTION]) {
  if (!key) throw new Error('Falta una variable de entorno en el archivo .env');
}

const common = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_CONNECTION
};

module.exports = {
  development: common,
  test: common,
  production: common
};
