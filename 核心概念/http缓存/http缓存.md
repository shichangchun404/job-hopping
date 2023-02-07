### 强制缓存的缓存规则是什么？
答：当浏览器向服务器发送请求的时候，服务器会将缓存规则放入HTTP响应的报文的HTTP头中和请求结果一起返回给浏览器，
控制强制缓存的字段分别是Expires和Cache-Control，其中Cache-Conctrol的优先级比Expires高。
存在该缓存结果和缓存标识，且该结果没有还没有失效，强制缓存生效，直接返回该结果.不再向服务器发送请求。

### Expires
Expires是HTTP/1.0控制网页缓存的字段，其值为服务器返回该请求的结果缓存的到期时间，即再次发送请求时，如果客户端的时间小于Expires的值时，直接使用缓存结果。
到了HTTP/1.1，Expires已经被Cache-Control替代，原因在于Expires控制缓存的原理是使用客户端的时间与服务端返回的时间做对比，如果客户端与服务端的时间由于某些原因（时区不同；客户端和服务端有一方的时间不准确）发生误差，那么强制缓存直接失效，那么强制缓存存在的意义就毫无意义。

### Cache-Control

在HTTP/1.1中，Cache-Control是最重要的规则，主要用于控制网页缓存，主要取值为：

（1）public：所有内容都将被缓存（客户端和代理服务器都可缓存）可以搭配max-age=xxx

（2）private：所有内容只有客户端可以缓存，Cache-Control的默认取值与public互斥 也可以搭配max-age=xxx

（3）no-cache：客户端缓存内容，但是不使用强制缓存，但是是否使用缓存则需要经过协商缓存来验证决定。【也就是说Cache-Control：no-cache是使用协商缓存的必要条件】

（4）no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存。

（5）max-age=xxx (单位秒)：缓存内容将在xxx秒后失效， 表示强制缓存xxx秒。

### 协商缓存 （Cache-Control：no-cache）
协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：
1 协商缓存生效，返回304
2 协商缓存失败，返回200和请求结果

同样，协商缓存的标识也是在响应报文的HTTP头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有：
Last-Modified / If-Modified-Since和 Etag / If-None-Match，
其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高。

#### Last-Modified / If-Modified-Since
Last-Modified是服务器响应请求时，返回该资源文件在服务器最后被修改的时间 （如果文件内容没有实际变化，只是时间变化也会导致缓存失效）
If-Modified-Since则是客户端再次发起该请求时，携带上次请求返回的Last-Modified值，通过此字段值告诉服务器该资源上次请求返回的最后被修改时间。服务器收到该请求，发现请求头含有If-Modified-Since字段，则会根据If-Modified-Since的字段值与该资源在服务器的最后被修改时间做对比，若服务器的资源最后被修改时间大于If-Modified-Since的字段值，则重新返回资源，状态码为200；否则则返回304，代表资源无更新，可继续使用缓存文件.

#### Etag / If-None-Match
Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成).（如果文件内容没有更新，只是时间发生变化 混存不会失效，故比Last-Modified / If-Modified-Since更精确，更优先）
If-None-Match是客户端再次发起该请求时，携带上次请求返回的唯一标识Etag值，通过此字段值告诉服务器该资源上次请求返回的唯一标识值。服务器收到该请求后，发现该请求头中含有If-None-Match，则会根据If-None-Match的字段值与该资源在服务器的Etag值做对比，一致则返回304，代表资源无更新，继续使用缓存文件；不一致则重新返回资源文件，状态码为200.

### 总结
强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回304，继续使用缓存。