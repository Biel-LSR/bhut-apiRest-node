const { v4: uuidv4 } = require("uuid");

/**
 * LogStore
 * Armazena logs em memória durante o ciclo de vida do processo.
 * Mantém no máximo MAX_ENTRIES registros; descarta os mais antigos.
 */
class LogStore {
  constructor() {
    this._logs = [];
    this.MAX_ENTRIES = 500;
  }

  /**
   * @param {{ level, method, path, status, duration_ms, message }} entry
   */
  add(entry) {
    this._logs.unshift({
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...entry,
    });

    if (this._logs.length > this.MAX_ENTRIES) {
      this._logs.pop(); // remove o mais antigo
    }
  }

  getAll() {
    return [...this._logs];
  }
}

module.exports = new LogStore(); // Singleton
