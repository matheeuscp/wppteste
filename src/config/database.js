function databaseConfig() {
  
    return {
      host: 'localhost',
      database: 'chat',
      username: 'postgres',
      password: 'DHsuueynG452Th26576Tytr',
      dialect: 'postgres',
      define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
      },
    };
  }
  
  module.exports = databaseConfig();
  