// Update with your config settings.

module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: "51.222.32.179",
      port: 5432,
      user: "postgres",
      password: "GlobalSoft2013$%",
      database: "questionario_horus",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/migration`,
    },
  },
};
