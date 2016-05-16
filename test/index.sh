proxy='http://localhost:8888/'

curl --proxy $proxy 'http://jandan.net/'
curl --proxy $proxy 'http://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js'

curl --proxy $proxy 'http://ww3.sinaimg.cn/mw600/a2c9d1e5jw1f3x0rs47gvj20pf0hzq5s.jpg' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,vi;q=0.2,zh-TW;q=0.2,ru;q=0.2,id;q=0.2,hi;q=0.2' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36' -H 'Accept: image/webp,image/*,*/*;q=0.8' -H 'Referer: http://jandan.net/' -H 'Connection: keep-alive' -H 'Cache-Control: no-cache' --compressed
