const { Router } = require("express");
const LogsController = require("../controllers/logs.controller");

const router = Router();

// Endpoint 3 — GET /api/logs
router.get("/", LogsController.list);

module.exports = router;
