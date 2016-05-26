## Erhu

## prepare

```bash
npm i -g electron-prebuilt 
npm i 
```

## run

```bash
npm start		# run develop
Proxy npm start # for debug 
```

### use vue-devtool

```js
// config.js
vueDevTools: true
```


## build

```bash
npm run build
# will build to dist
```









#### Other
1. [livepool](https://www.npmjs.com/package/livepool) just web
2. [anyproxy](https://github.com/alibaba/anyproxy) just web
3. fiddler for `window`
4. charles for `mac`



## Protocol

#### Request Object

```
request {
  id,       // 为该请求分配的唯一ID
  protocol  // http/https/ws/tcp
  host,     // hostname, 如：localhost
  port,     // 80 的时候为空
  method,   // GET/POST/PUT
  path,     // pathname?search
  url,      // 完整的URL
  headers,  // 请求头
  remoteAddress,   // remote server IP，只能在 connected 事件触发后拿获得
  body,      // <Buffer> 请求的体内容，只能在 request-end 事件触发后拿到完整的值
  cookies    // 解析cookie后得到的cookie对象
}
```

#### Response Object

```
response {
  id,         // 与请求对象的 ID 一致
  statusCode, // 状态码
  statusMessage,
  headers,    // 响应头
  data        // <Buffer> 响应内容，只能在 reponse-end 事件触发后拿到完整的值
}
```


#### Events


* **request**(req)

  发送代理请求前触发，可能在 request-data 之前。`触发一次`

* **request-data**(req)

  接收到请求body时触发，用于获取如 POST 的请求体。`多次触发`

* **request-end**(req)

  已完整获取请求 body 时触发。`触发一次`

* **connected**(req)

  代理请求成功建立链接时触发。`触发一次`

* **response**(req, res)

  接收到响应的第一个包时触发。`触发一次`

* **reponse-data**(req, res)

  接收到响应body时触发。`多次触发`

* **response-end**(req, res)

  完成响应 body 接收后触发。`触发一次`


### Documents

* [create-a-self-signed-certificate-with-openssl](http://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl)

* [OpenSSL Certificate Authority](https://jamielinux.com/docs/openssl-certificate-authority/create-the-root-pair.html#verify-the-root-certificate)
