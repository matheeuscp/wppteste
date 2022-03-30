function databaseConfig() {
  
    return {
      host: 'localhost',
      database: 'chat',
      username: 'root',
      password: '',
      // password: 'DHsuueynG452Th26576Tytr',
      dialect: 'mysql',
      define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
      },
    };
  }
  
  module.exports = databaseConfig();
  