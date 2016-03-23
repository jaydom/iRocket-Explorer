var _multiparty  = require('multiparty');
var _fs= require('fs');
var _util = require('util');

exports.add = function(req, res){
    //生成multiparty对象，并配置下载目标路径
    var form = new _multiparty.Form({uploadDir: './public/root/'});
//下载后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);

        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/root/' + inputFile.originalFilename;
            //重命名为真实文件名
            _fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }

        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('received upload:\n\n');
        res.end(_util.inspect({fields: fields, files: filesTmp}));
    });
};
