require('dotenv').config();

module.exports = {
  development: {
    database: 'todo-dev',
    use_env_variables: 'DATABASE_URL_DEV',
    dialect: 'postgres',
  },
  test: {
    database: 'todo-test',
    use_env_variables: 'DATABASE_URL_TEST',
    dialect: 'postgres',
  },
  production: {
    database: 'todo-prod',
    use_env_variables: 'DATABASE_URL_PROD',
    dialect: 'postgres',
  },
}