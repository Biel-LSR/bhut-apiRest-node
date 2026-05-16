const logStore = require("../config/logStore");

const LogsController = {
  // ── GET /api/logs 
  list(req, res) {
    const logs = logStore.getAll();

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  },
};

module.exports = LogsController;
