const CarService = require("../services/postCarService");
const logStore = require("../config/logStore");

const CarConsumer = {

  async createAndLog(payload, token) {
    // ── Passo 1: Criar na API externa 
    
    const car = await CarService.create(payload, token);
    

    // ── Passo 2: Registrar evento de criação no LogStore 
    logStore.add({
      level: "info",
      method: "CONSUMER",
      path: "/v1/carro",
      status: 201,
      duration_ms: 0,
      message: `Carro criado — id: ${car._id} | titulo: "${car.titulo}" | marca: ${car.marca} | ano: ${car.ano}`,
    });

    console.log(`[CarConsumer] Carro criado e registrado: id=${car._id}`);

    return car;
  },
};

module.exports = CarConsumer;
