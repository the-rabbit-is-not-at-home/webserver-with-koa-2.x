const fs = require('fs');
exports.get_test_data = function(){
   let content = fs.readFileSync('./mock/test.json','utf-8'); //读取文件的格式 参数 必须加上('utf-8')
   return content;
};
exports.get_search_data = function(start,end,keyword){
    return function(cb){
        const http = require('http');
        const qs = require('querystring');
        let data = {
            s:keyword,
            start:start,
            end:end
        };
        let content = qs.stringify(data);
        let request_address = {
            hostname:'dushu.xiaomi.com',
            port:80,
            path:'/store/v0/lib/query/onebox?'+content
        };
        let req_obj = http.request(request_address,function(_res){
           let content = '';
           _res.setEncoding('utf8');
           _res.on('data',function(chunk){
               content += chunk;
           });
           _res.on('end',function(){
               cb(null,content);
           })
        });
        req_obj.on('error',function(){

        });
        req_obj.end();
    };
};