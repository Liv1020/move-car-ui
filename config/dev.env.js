var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: '"http://mc.liv1020.com"',
  API_HOST: '"http://localhost:8080/frontend"',
  WEB_SOCKET: '"wx://localhost:8080/frontend/ws"'
})
