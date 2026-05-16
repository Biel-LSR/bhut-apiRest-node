const apiClient = require("./apiClient");

const CarService = {

  async getAll(token) {
    const { data } = await apiClient.get("/v1/carro", { _token: token });
    return data;
  },

  
};

module.exports = CarService;
