
function errorMiddleware(err, req, res, next) {
  console.error("[ErrorMiddleware]", err.message);

  // ── Erro originado pelo Axios 
  if (err.isAxiosError) {
    const externalStatus = err.response?.status;
    const externalMessage =
      err.response?.data?.message ??
      err.response?.data?.error ??
      "Erro ao comunicar com a API externa.";

    // Mapeia status externos para o status HTTP da nossa resposta
    const httpStatus =
      externalStatus === 400 ? 400 :
      externalStatus === 401 ? 401 :
      externalStatus === 403 ? 403 :
      externalStatus === 404 ? 404 :
      externalStatus === 422 ? 422 :
      502; // Bad Gateway para qualquer outro erro externo

    return res.status(httpStatus).json({
      success: false,
      message: externalMessage,
      origin: "external_api",
      external: {
        status: externalStatus ?? null,
        url: err.config?.url ?? null,
      },
    });
  }

  // ── Erro interno genérico 
  return res.status(500).json({
    success: false,
    message: err.message || "Erro interno no servidor.",
  });
}

module.exports = errorMiddleware;
