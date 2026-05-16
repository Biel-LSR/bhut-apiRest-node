require("dotenv").config();

const config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "Desenvolvimento",

  externalApi: {
    baseUrl:
      process.env.EXTERNAL_API_BASE_URL || "http://api-test.bhut.com.br:3000/api",
    timeout: Number(process.env.EXTERNAL_API_TIMEOUT) || 8000,
  },
};

module.exports = config;
