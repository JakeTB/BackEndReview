const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";
console.log(ENV, "<<<<<ENV");
const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      user: "jake",
      password: "1234psql"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      user: "jake",
      password: "1234psql"
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

console.log(customConfig[ENV]);

module.exports = { ...customConfig[ENV], ...baseConfig };
