const createApp = require("./app");
const config = require("./config/env");

async function bootstrap() {
  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log("\n" + "═".repeat(52));
    console.log("  Car API — " + config.nodeEnv.toUpperCase());
    console.log("═".repeat(52));
    console.log(`  Servidor:    http://localhost:${config.port}`);
    console.log(`  API externa: ${config.externalApi.baseUrl}`);
    console.log("─".repeat(52));
    console.log("  Endpoints:");
    console.log(`  GET  http://localhost:${config.port}/api/car`);
    console.log(`  POST http://localhost:${config.port}/api/car`);
    console.log(`  GET  http://localhost:${config.port}/api/logs`);
    console.log("═".repeat(52) + "\n");
  });

  // ── Graceful shutdown 
  const shutdown = (signal) => {
    console.log(`\n[Shutdown] ${signal} recebido. Encerrando...`);
    server.close(() => {
      console.log("[Shutdown] Servidor encerrado.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap().catch((err) => {
  console.error("[Bootstrap] Erro fatal:", err);
  process.exit(1);
});
