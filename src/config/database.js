function databaseConfig() {
  
    return {
      host: 'localhost',
      database: 'chat',
      username: 'root',
      // password: '',
      password: 'YTwgsgagkHHSAHGASASAHGSAFFAR254144426*$31!6211',
      dialect: 'mysql',
      define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
      },
    };
  }
  
  module.exports = databaseConfig();
  