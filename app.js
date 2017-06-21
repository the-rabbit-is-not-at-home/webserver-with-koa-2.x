const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const service = require('./service/webAppService');
/**
 * template render
 * */
const views = require('koa-views');
app.use(views(__dirname+'/view',{
   map: {
       html: 'ejs'
   }
}));

/**
 * static file
 * */
const koa_static = require('koa-static-server');
app.use(koa_static({
    rootDir: 'static',
    rootPath:'/static/'
}));
router.get('/',async function(ctx,next){
    ctx.set('Cache-Control','no-cache');
    await ctx.render('index',{title:'koa is almost success'});
});
router.get('/test',async function(ctx,next){
    ctx.set('Cache-Control','no-cache');
    await ctx.render('test',{title:'koa is almost success'});
});
router.get('/mock_test',function(ctx,next){
   ctx.body = service.get_test_data();
});
router.get('/ajax_test', function*(ctx){
    const qs = require('querystring');
    let url = ctx.request.originalUrl.slice(ctx.request.originalUrl.indexOf('?')+1,ctx.request.originalUrl.length);
    const parse_qs = qs.parse(url);
    let start = parse_qs.start;
    let end = parse_qs.end;
    let keyword = parse_qs.keyword;
    ctx.body = yield service.get_search_data(start,end,keyword);
});
app.use(router.routes());
app.listen(3000);
console.log('koa server is started');