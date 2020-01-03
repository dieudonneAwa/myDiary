require('dotenv').config();

module.exports = {
  development: {
    database: 'mydiary-dev',
    use_env_variables: 'DATABASE_URL_DEV',
    dialect: 'postgres',
  },
  test: {
    database: 'mydiary-test',
    use_env_variables: 'DATABASE_URL_TEST',
    dialect: 'postgres',
  },
  production: {
    database: 'mydiary-prod',
    use_env_variables: 'DATABASE_URL_PROD',
    dialect: 'postgres',
  },
}
