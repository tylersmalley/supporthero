'use strict';

const Hapi = require('hapi');
const Path = require('path');
const port = parseInt(process.env.PORT) || 8010;

// Create a server with a host and port
const server = new Hapi.Server();

server.register(require('inert'), function (err) {
  server.connection({
    port: port
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      cache: {
        expiresIn: 3600 * 1000,
        privacy: 'public'
      }
    }
  });

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});
