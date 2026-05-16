const CarService = require("../services/getCarService");
const CarConsumer = require("../consumers/car.consumer");

const REQUIRED_FIELDS = [
   "nome",
  "marca",
  "preco",
  "anoFabricacao"
];

const CarController = {
 
  async list(req, res, next) {
    try {
      const token = req.headers["authorization"]
      const cars = await CarService.getAll(token);

      res.status(200).json({
        success: true,
        count: cars.length,
        data: cars,
      });
    } catch (err) {
      next(err);
    }
  },

};

module.exports = CarController;
