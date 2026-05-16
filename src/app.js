const express = require("express");
const morgan = require("morgan");
const carRouter = require("./routes/car.routes");
const logsRouter = require("./routes/logs.routes");
const requestLogger = require("./middlewares/requestLogger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

function createApp() {
  const app = express();

  // ── Middlewares globais 
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(requestLogger); 

  // ── Rota raiz 
  app.get("/", (req, res) => {
    res.json({
      name: "Car API",
      version: "1.0.0",
      stack: "Node.js · Express · Axios",
      endpoints: {
        "GET  /api/car":  "Lista todos os carros (proxy da API externa)",
        "POST /api/car":  "Cria carro na API externa",
        "GET  /api/logs": "Lista logs de requisições",
      },
      externalApi: "http://api-test.bhut.com.br:3000/api",
    });
  });

  // ── Rotas 
  app.use("/api/car", carRouter);
  app.use("/api/logs", logsRouter);

  // ── Erro global (deve ser o último middleware) 
  app.use(errorMiddleware);

  return app;
}

module.exports = createApp;
