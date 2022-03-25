function databaseConfig() {
  
    return {
      host: '165.227.201.7',
      database: 'chat',
      username: 'postgres',
      password: 'DHsuueynG452Th265',
      dialect: 'postgres',
      define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
      },
    };
  }
  
  module.exports = databaseConfig();
  