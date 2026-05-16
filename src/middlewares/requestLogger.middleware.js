const logStore = require("../config/logStore");

/**
 * requestLogger
 * Registra cada requisição HTTP no LogStore após o envio da resposta.
 * Usa o evento "finish" para capturar status e tempo reais.
 */
function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on("finish", () => {
    const duration_ms = Date.now() - startedAt;
    const status = res.statusCode;

    logStore.add({
      level: status >= 500 ? "error" : status >= 400 ? "warn" : "info",
      method: req.method,
      path: req.originalUrl,
      status,
      duration_ms,
      message: `${req.method} ${req.originalUrl} → ${status} (${duration_ms}ms)`,
    });
  });

  next();
}

module.exports = requestLogger;
