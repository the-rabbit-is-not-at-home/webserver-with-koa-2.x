一、 当前的koa版本与所要求的nodejs版本不同步
    If you're not using node v7.6+, we recommend setting up babel with babel-preset-env:

    $ npm install babel-register babel-preset-env --save
    Setup babel-register in your entry file:

    require('babel-register');
    And have your .babelrc setup:

    {
      "presets": [
        ["env", {
          "targets": {
            "node": true
          }
        }]
      ]
    }

    *******************************
    **在跟目录手动创建 .babelrc 文件     命令行:type null>.babelrc
    webstorm 可以直接创建 .babelrc 文件
    *******************************
二、如下代码:

    require('babel-register');
    const Koa = require('koa');
    const app = new Koa();

    // response
    app.use(ctx => {
        ctx.body = 'Hello Koa';
    });

    app.listen(3000);
    console.log('server is started');

    运行会报错：

      const { res } = this;
               ^

     SyntaxError: Unexpected token {
         at exports.runInThisContext (vm.js:53:16)
         at Module._compile (module.js:387:25)
         at Module._extensions..js (module.js:422:10)
         at Object.require.extensions.(anonymous function) [as .js] (C:\Users\daichao\Desktop\Node\webappReader\node_modules\babel-register\lib\node.js:152:7)
         at Module.load (module.js:357:32)
         at Function.Module._load (module.js:314:12)
         at Module.require (module.js:367:17)
         at require (internal/module.js:16:19)
         at Object.<anonymous> (C:\Users\daichao\Desktop\Node\webappReader\node_modules\koa\lib\application.js:11:18)
         at Module._compile (module.js:413:34)

         *************解决问题： 将koa的版本由2.2 降低到2.0*******************

三、不支持async异步函数
四、多数原因是node版本导致的 将node版本升级到7.6.0   一切ok
五、如下代码：

     app.use(koa_static({
         rootDir: 'static',
         rootPath:'/static'
     }));

     只会加载static子目录下的静态文件，不能再深层访问；
     rootPath: '/static/'才会深层访问



