const CarService = require("../services/postCarService");
const CarConsumer = require("../consumers/car.consumer");

const REQUIRED_FIELDS = [
  "nome",
  "marca",
  "preco",
  "anoFabricacao"
];

const CarController = {
   
  async create(req, res, next) {
    try {
      const token = req.headers["authorization"];
      const payload = req.body;
      const missing = REQUIRED_FIELDS.filter(
        (field) => payload[field] === undefined || payload[field] === ""
      );
      console.log(missing)
      if (missing.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Campos obrigatórios ausentes: ${missing.join(", ")}`,
        });
      }

      const car = await CarConsumer.createAndLog(payload, token);

      res.status(201).json({
        success: true,
        data: car,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CarController;
