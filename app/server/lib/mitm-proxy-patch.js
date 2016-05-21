'use strict'

const https = require('https')
const WebSocket = require('ws');

module.exports = function (MITMProxy) {
  MITMProxy.prototype._createHttpsServer = function (options, callback) {
    var httpsServer = https.createServer(options);
    httpsServer.timeout = this.timeout;
    httpsServer.on('error', this._onError.bind(this, 'HTTPS_SERVER_ERROR', null));
    httpsServer.on('clientError', this._onError.bind(this, 'HTTPS_CLIENT_ERROR', null));
    httpsServer.on('connect', this._onHttpServerConnect.bind(this));
    httpsServer.on('request', this._onHttpServerRequest.bind(this, true));
    var wssServer = new WebSocket.Server({ server: httpsServer });
    wssServer.on('connection', this._onWebSocketServerConnect.bind(this, true));
    var listenArgs = [function() {
      if (callback) callback(httpsServer.address().port, httpsServer, wssServer);
    }];
    if (this.httpsPort) {
      listenArgs.unshift(this.httpsPort);
    }
    httpsServer.listen.apply(httpsServer, listenArgs);
  };
}
