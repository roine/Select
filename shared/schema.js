module.exports = {
  criteria: {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    name: 'VARCHAR',
    created: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
    updated: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
  }
};