'use strict'

// const https = require('https')
// const WebSocket = require('ws');
const async = require('async')

module.exports = function (MITMProxy) {
  /**
   * Add custom handler for CONNECT method
   * @augments
   *   - fn(req,socket,head,callback) be called on receiving CONNECT method
   */
  MITMProxy.prototype.onConnect = function(fn) {
    if (!this.onConnectHandlers) this.onConnectHandlers = []
    this.onConnectHandlers.push(fn);
    return this;
  };
  MITMProxy.prototype._onHttpServerConnectData = MITMProxy.prototype._onHttpServerConnect
  MITMProxy.prototype._onHttpServerConnect = function(req, socket, head) {
    var self = this;

    // you can forward HTTPS request directly by adding custom CONNECT method handler
    return async.forEach(self.onConnectHandlers || [], function (fn, callback) {
      return fn.call(self, req, socket, head, callback)
    }, function (err) {
      if (err) {
        return self._onError('ON_CONNECT_ERROR', null, err);
      }
      // we need first byte of data to detect if request is SSL encrypted
      if (!head || head.length === 0) {
          socket.once('data', self._onHttpServerConnectData.bind(self, req, socket));
          socket.write('HTTP/1.1 200 OK\r\n');
          if (self.keepAlive && req.headers['proxy-connection'] === 'keep-alive') {
            socket.write('Proxy-Connection: keep-alive\r\n');
            socket.write('Connection: keep-alive\r\n');
          }
          return socket.write('\r\n');
      } else {
        self._onHttpServerConnectData(req, socket, head)
      }
    })
  }


  /**
   * patch https port error, resolved since 0.5.0
   */
  // MITMProxy.prototype._createHttpsServer = function (options, callback) {
  //   var httpsServer = https.createServer(options);
  //   httpsServer.timeout = this.timeout;
  //   httpsServer.on('error', this._onError.bind(this, 'HTTPS_SERVER_ERROR', null));
  //   httpsServer.on('clientError', this._onError.bind(this, 'HTTPS_CLIENT_ERROR', null));
  //   httpsServer.on('connect', this._onHttpServerConnect.bind(this));
  //   httpsServer.on('request', this._onHttpServerRequest.bind(this, true));
  //   var wssServer = new WebSocket.Server({ server: httpsServer });
  //   wssServer.on('connection', this._onWebSocketServerConnect.bind(this, true));
  //   var listenArgs = [function() {
  //     if (callback) callback(httpsServer.address().port, httpsServer, wssServer);
  //   }];
  //   if (this.httpsPort) {
  //     listenArgs.unshift(this.httpsPort);
  //   }
  //   httpsServer.listen.apply(httpsServer, listenArgs);
  // };

}
