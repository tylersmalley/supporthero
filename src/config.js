var config = {
  apiBase: 'http://localhost:3000/api/'
};

if (process.env.NODE_ENV == 'production') {
  config.apiBase = 'https://supporthero-api.herokuapp.com/api/';
}

module.exports = config;
