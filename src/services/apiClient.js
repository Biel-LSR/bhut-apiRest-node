const axios = require("axios");
const config = require("../config/env");

const apiClient = axios.create({
  baseURL: config.externalApi.baseUrl,
  timeout: config.externalApi.timeout,
  headers: {  
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request 
apiClient.interceptors.request.use(
  (cfg) => {
    const token = cfg._token;
    if (token) {
      cfg.headers["Authorization"] = token; // já vem com "Bearer ..."
    }

    console.log(`[HTTP →] ${cfg.method?.toUpperCase()} ${cfg.baseURL}${cfg.url}`);
    return cfg;
  },
  (err) => Promise.reject(err)
);

// ── Response 
apiClient.interceptors.response.use(
  (res) => {
    console.log(`[HTTP ←] ${res.status} ${res.config.url}`);
    return res;
  },
  (err) => {
    const status = err.response?.status ?? "TIMEOUT/SEM_RESPOSTA";
    console.error(`[HTTP ←] ${status} ${err.config?.url ?? ""} — ${err.message}`);
    return Promise.reject(err);
  }
);

module.exports = apiClient;
