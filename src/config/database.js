function databaseConfig() {
  
    return {
      host: 'localhost',
      database: 'chat',
      username: 'root',
      password: '',
      dialect: 'mysql',
      define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
      },
    };
  }
  
  module.exports = databaseConfig();
  