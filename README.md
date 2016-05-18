## Erhu

## prepare

```bash
npm i -g electron-prebuilt 
npm i 
```

## run

```bash
npm run start
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
	id,			// 为该请求分配的唯一ID
	protocol	// http/https/ws/tcp
	host,		// hostname, 如：localhost
	port,		// 80 的时候为空
	method,		// GET/POST/PUT
	path,		// 完整的URL
	headers,	// 请求头
	server,		// remote server IP，只能在 connect 事件触发后拿获得
	body		// <Buffer> 请求的体内容，只能在 proxyReceived 事件触发后拿到完整的值
}
```

#### Response Object

```
response {
	id,			// 与请求对象的 ID 一致
	headers,	// 响应头
	body		// <Buffer> 响应内容，只能在 reponseEnd 事件触发后拿到完整的值
}
```


#### Events

* proxyReceive(req)
	接收到请求body时触发，用于获取如Post请求的请求体。`多次触发`

* proxyReceived(req)
	已完整获取请求body时触发。`触发一次`

* beforeRequest(req)
	发送代理请求前触发，可能在 proxyReceived 之前。`触发一次`

* connect(req)
	代理请求成功建立链接时触发。`触发一次`

* beforeReponse(req, res)
	接收到响应的第一个包时触发。`触发一次`

* reponse(req, res)
	接收到响应body时触发。`多次触发`

* reponseEnd(req, res)
	完成响应body接收后触发。`触发一次`



