const _columnTitles = {
  "index": "#",
  "name": "Name",
  "method": "Method",
  "status": "Status",
  "protocol": "Protocol",
  "scheme": "Scheme",
  "domain": "Domain",
  "remoteAddress": "Remote Address",
  "type": "Type",
  "initiator": "Initiator",
  "cookies": "Cookies",
  "setCookies": "Set-Cookies",
  "size": "Size",
  "time": "Time",
  "connectionId": "Connection Id",
  "priority": "Priority",
  "timeline": "Timeline",

  // Response header columns
  "Cache-Control": "Cache-Control",
  "Connection": "Connection",
  "Content-Encoding": "Content-Encoding",
  "Content-Length": "Content-Length",
  "ETag": "ETag",
  "Keep-Alive": "Keep-Alive",
  "Last-Modified": "Last-Modified",
  "Server": "Server",
  "Vary": "Vary"
}
const _columnSubTitles = {
  name: 'Path',
  status: 'Text',
  size: 'Content',
  time: 'Latency'
}
const _defaultColumnsVisibility = {
  index: true,
  name: true,
  method: false,
  status: true,
  protocol: false,
  scheme: false,
  domain: false,
  remoteAddress: false,
  type: true,
  initiator: true,
  cookies: false,
  setCookies: false,
  size: true,
  time: true,
  priority: false,
  connectionId: false,
  "Cache-Control": false,
  "Connection": false,
  "Content-Encoding": false,
  "Content-Length": false,
  "ETag": false,
  "Keep-Alive": false,
  "Last-Modified": false,
  "Server": false,
  "Vary": false 
}
const _responseHeaderColumns = ["Cache-Control", "Connection", "Content-Encoding", "Content-Length", "ETag", "Keep-Alive", "Last-Modified", "Server", "Vary"]

const netColumns = (function(){
  let columns = []
  columns.push({
    id: "index",
    title: "#",
    weight: 1
  })

  columns.push({
      id: "name",
      title: _columnTitles["name"],
      sub: 'Path',
      weight: 20
  })

  columns.push({
      id: "method",
      title: _columnTitles["method"],
      weight: 6
  })

  columns.push({
      id: "status",
      sub: _columnSubTitles["status"],
      title: _columnTitles["status"],
      weight: 6
  })

  columns.push({
      id: "protocol",
      title: _columnTitles["protocol"],
      weight: 6
  })

  columns.push({
      id: "scheme",
      title: _columnTitles["scheme"],
      weight: 6
  })

  columns.push({
      id: "domain",
      title: _columnTitles["domain"],
      weight: 6
  })

  columns.push({
      id: "remoteAddress",
      title: _columnTitles["remoteAddress"],
      weight: 10,
      align: 'right'
  })

  columns.push({
      id: "type",
      title: _columnTitles["type"],
      weight: 6
  })

  columns.push({
      id: "initiator",
      title: _columnTitles["initiator"],
      weight: 10
  })

  columns.push({
      id: "cookies",
      title: _columnTitles["cookies"],
      weight: 6,
      align: 'right'
  })

  columns.push({
      id: "setCookies",
      title: _columnTitles["setCookies"],
      weight: 6,
      align: 'right'
  })

  columns.push({
      id: "size",
      title: _columnTitles["size"],
      sub: _columnSubTitles["size"],
      weight: 6,
      align: 'right'
  })

  columns.push({
      id: "time",
      title: _columnTitles["time"],
      sub: "Latency",
      weight: 6,
      align: 'right'
  })

  columns.push({
      id: "priority",
      title: _columnTitles["priority"],
      weight: 6
  })

  columns.push({
      id: "connectionId",
      title: _columnTitles["connectionId"],
      weight: 6
  })

  let responseHeaderColumns = _responseHeaderColumns
  for (var i = 0; i < responseHeaderColumns.length; ++i) {
      var headerName = responseHeaderColumns[i]
      var descriptor = {
          id: headerName,
          title: _columnTitles[headerName],
          weight: 6
      }
      if (headerName === "Content-Length"){
        descriptor.align = 'right'
      }
      columns.push(descriptor)
  }

  columns.push({
      id: "timeline",
      title: _columnTitles["timeline"],
      sortable: false,
      weight: 40,
      sort: ''
  })

  return columns
})()

export default {
  defaultColumns: netColumns,
  columnTitles: _columnTitles,
  columnSubTitles: _columnSubTitles,
  defaultColumnsVisibility: _defaultColumnsVisibility
}