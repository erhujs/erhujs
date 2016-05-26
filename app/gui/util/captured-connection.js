'use strict'

import url from 'url'
// import zlib from 'zlib'
import isTextOrBinary from 'istextorbinary'

export function fullUrl(req, isSSL) {
  let parsedUrl = url.parse(req.url)
  parsedUrl.protocol = isSSL ? 'https' : 'http'
  parsedUrl.host = req.headers.host

  return url.format(parsedUrl)
}

/**
 * TODO should be async
 *
 * @param
 */

// export function unpackBody(buffer, encoding) {
//   if (encoding === 'gzip') {
//     try {
//       return zlib.unzipSync(buffer)
//     } catch (e) {
//       return buffer
//     }
//   } else if (encoding === 'deflate') {
//     try {
//       return zlib.inflateSync(buffer)
//     } catch (e) {
//       return buffer
//     }
//   } else {
//     throw Error('unknown encoding')
//   }
// }

/**
 * 
 *
 * @param
 */

export function isBinary(contentType, buffer) {
  let type = getResourceType(contentType)

  //TODO Image is not always binary (SVG)
  if (type === 'Image' || type === 'Media' || type === 'Font') {
    return true
  }

  if (type === 'Other' && isTextOrBinary.isBinarySync(buffer)) {
    return true
  }

  return false
}

/**
 * See https://chromedevtools.github.io/debugger-protocol-viewer/Page/#type-ResourceType
 * TODO steal more comprehensive solution from other library or... find a library for that
 *
 * @param
 */

export function getResourceType(contentType) {
  if (contentType && contentType.match) {
    if (contentType.match('text/css')) {
      return 'Stylesheet'
    }
    if (contentType.match('text/html')) {
      return 'Document'
    }
    if (contentType.match('/(x-)?javascript')) {
      return 'Script'
    }
    if (contentType.match('image/')) {
      return 'Image'
    }
    if (contentType.match('video/')) {
      return 'Media'
    }
    if (contentType.match('font/') || contentType.match('/(x-font-)?woff')) {
      return 'Font'
    }
    if (contentType.match('/(json|xml)')) {
      return 'XHR'
    }
  }
  return 'Other'
}

/**
 * TODO try getting real raw response headers instead of this thing
 *
 * @param
 */

export function recreateRawResponseHeaders(res) {
  let headerString = ''

  for (let i = 0, l = res.rawHeaders.length i < l i += 2) {
    headerString += res.rawHeaders[i] + ': ' + res.rawHeaders[i + 1] + '\n'
  }

  return `HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}${headerString}`
}

/**
 * response object keeps some params (like cookies) in an array
 * devtools don't like that, they want a string
 *
 * @param
 */

export function flattenHeaders (headers) {
  let flatHeaders = {}

  for (let name in headers) {
    let value = headers[name]

    if (Array.isArray(value)) {
      value = value.join('\n')
    }

    flatHeaders[name] = value
  }

  return flatHeaders
}
