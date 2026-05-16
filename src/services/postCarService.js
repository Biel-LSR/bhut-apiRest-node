const apiClient = require("./apiClient");

const CarService = {

  async create(payload, token) {
    const { data } = await apiClient.post("/v1/carro", payload, { _token: token });
    return data;
  },
};

module.exports = CarService;
