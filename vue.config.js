const Dotenv = require("dotenv-webpack");

module.exports = {
  configureWebpack: {
    plugins: [new Dotenv()],
  },
  devServer: {
    host: "app.currency-interface.local",
  },
};
