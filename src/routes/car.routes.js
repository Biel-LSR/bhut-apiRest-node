const { Router } = require("express");
const postCarController = require("../controllers/postCarController");
const getCarController = require("../controllers/getCarController");

const router = Router();

// Endpoint 1 — GET /api/car
router.get("/", getCarController.list);

// Endpoint 2 — POST /api/car
router.post("/", postCarController.create);

module.exports = router;
