# 代码优化

## 首页加载优化

### 路由懒加载

改直接`import`组件为动态引入，按需加载，只有在使用到时才会引入，阻止了在首次加载时直接加载所有所用到的组件导致渲染卡顿。

```js
{
  path: '/order',
  name: 'Order',
  component: () => import('@/views/order/order')
}
```

### 打包文件中去掉map文件

`webpack`配置`productionSourceMap`为`false`，在打包生成时不会生成Source Map

> Source Map就是一个信息文件，里面存储了代码打包转换后的位置信息，实质是一个`json`描述文件，维护了打包前后的代码映射关系。

### JS文件压缩

`UglifyJS`是命令行工具，用于压缩`JavaScript`代码。例：将echarts.js压缩。

#### 安装

```sh
npm install uglify -js -g
```

#### 使用

```sh
uglifyjs app.js -o app.min.js
```

### gzip打包

gizp压缩是一种http请求优化方式，通过减少文件体积来提高加载速度。<br>
html、js、css文件甚至json数据都可以用它压缩，可以减小60%以上的体积。

#### 安装

```sh
npm i -D compression-webpack-plugin
```

#### 使用

- webpack配置（vue.config.js）
```js
const CompressionPlugin = require('compression-webpack-plugin')

// 是否生产模式
const isProd = process.env.NODE_ENV === 'production'
const vueConfig = {
  ..., // 其他配置
  configureWebpack: config => {
    if (isProd) {
      config.plugins = [...config.plugins, ...[
        // 忽略所有momentJs的lcoale文件
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
          APP_VERSION: `"${require('./package.json').version}"`,
          GIT_HASH: JSON.stringify(getGitHash()),
          BUILD_DATE: buildDate
        }),
        // 压缩成 .gz 文件
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|svg|woff|ttf|json|html|webp)$/,
          threshold: 10240,
          minRatio: 0.8
        }),
        // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|svg|woff|ttf|json|html|webp)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11
            }
          },
          threshold: 10240,
          minRatio: 0.8
        })
      ]]
      // 开启分离 js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...[
        // 忽略所有momentJs的lcoale文件
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
          APP_VERSION: `"${require('./package.json').version}"`,
          GIT_HASH: JSON.stringify(getGitHash()),
          BUILD_DATE: buildDate
        })
      ]]
    }
    // preview.pro.loacg.com only do not use in your production;
    if (process.env.VUE_APP_PREVIEW === 'true') {
      // add `ThemeColorReplacer` plugin to webpack plugins
      config.plugins.push(createThemeColorReplacerPlugin())
    }
    // 如果是生产模式，则添加externals
    config.externals = isProd ? assetsCDN.externals : {}
  },
  ... // 其他配置
}

module.exports = vueConfig
```

- Nginx配置

```conf
server {
  #gzip模块设置    
  #开启压缩
  gzip  on;       
  # 设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。 默认值是0，不管页面多大都压缩。建议设置成大于2k的字节数，小于2k可能会越压越大。  
  gzip_min_length 2k;      
  # 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。 例如 4 4k 代表以4k为单 位，按照原始数据大小以4k为单位的4倍申请内存。 4 8k 代表以8k为单位，按照原始数据大小以8k 为单位的4倍申请内存。      
  # 如果没有设置，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩结果。      
  gzip_buffers 4 16k;      
  #压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间
  gzip_comp_level 5;      
  # 默认值: gzip_types text/html (默认不对js/css文件进行压缩)      
  # 压缩类型，匹配MIME类型进行压缩      
  # 不能用通配符 text/*      
  # (无论是否指定)text/html默认已经压缩       
  # 设置哪压缩种文本文件可参考 conf/mime.types      
  gzip_types text/plain application/xjavascript text/css application/xml;     
  # 值为1.0和1.1 代表是否压缩http协议1.0，选择1.0则1.0和1.1都可以压缩      
  gzip_http_version 1.0       
  # IE6及以下禁止压缩
  gzip_disable "MSIE [1-6]\.";       
  # 默认值：off      
  # Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果，匹配的前提是后端服 务器必须要返回包含"Via"的 header头。      
  # off - 关闭所有的代理结果数据的压缩      
  # expired - 启用压缩，如果header头中包含 "Expires" 头信息      
  # no-cache - 启用压缩，如果header头中包含 "Cache-Control:no-cache" 头信息     
  # no-store - 启用压缩，如果header头中包含 "Cache-Control:no-store" 头信息     
  # private - 启用压缩，如果header头中包含 "Cache-Control:private" 头信息      
  # no_last_modified - 启用压缩,如果header头中不包含 "Last-Modified" 头信息     
  # no_etag - 启用压缩 ,如果header头中不包含 "ETag" 头信息      
  # auth - 启用压缩 , 如果header头中包含 "Authorization" 头信息      
  # any - 无条件启用压缩
  gzip_proxied expired no-cache no-store private auth;      
  # 给CDN和代理服务器使用，针对相同url，可以根据头信息返回压缩和非压缩副本      
  gzip_vary on;
}
```

## 海量数据渲染优化

