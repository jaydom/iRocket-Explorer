/* GET home page. */
var _fs = require('fs');
var _root_dir = process.cwd()+'/public/root';
var _path = require('path');

exports.index = function(req, res){
    res.redirect('/list/root');
};

exports.list = function(req, res){
    res.render('index', { title: '家庭云' });
};

exports.download = function(req, res){
    //res.render('index', { title: 'Express' });
    var path = req.url.substr("/download/root".length);
    var realpath = _root_dir + path;
    console.log(realpath);
    console.log(_path.basename(realpath));
    var filename = _path.basename(realpath);
    res.download(realpath,filename);
};

exports.view = function(req, res){
    //res.render('index', { title: 'Express' });
    var path = req.url.substr("/view/root".length);
    var file_type = _path.extname(path);
    if(file_type==".mp4"){
        var cloud_path = "/download/root"+ path;
        res.render('video', { title: '家庭云' ,cloud_path:cloud_path});
    }else{
        res.render('error', {
            message: "not support file type:" + file_type,
            error: {}
        });
    }
};

exports.data = function(req,res){
    var str2 = req.url;
    var reg2 = /\?/;
    var res2 = str2.split(reg2);
    console.log(res2);
    //获取目录
    var fileList = [];
    function walk(root_dir,cur_item){
        try{
            var path = root_dir+ cur_item;
            var dirList = _fs.readdirSync(path);
            dirList.forEach(function(item){
                console.log(item);
                var item_href = cur_item+'/'+item;
                var item_path = path + '/' + item;
                if(_fs.statSync(path + '/' + item).isDirectory()){
                    fileList.push({name:item,path:item_path,type:'dir',href:"/list/root"+item_href,description:'目录'});
                }else{
                    console.log(item);
                    var file_type = _path.extname(item);
                    console.log(file_type);
                    if(file_type==".mp4"){
                        fileList.push({name:item,path:item_path,type:'file',href:"/view/root"+item_href,description:'文件'});
                    }else{
                        fileList.push({name:item,path:item_path,type:'file',href:"/download/root"+item_href,description:'文件'});
                    }
                }
            });
        }catch(e){
            //may you not have read permission or the file not exists
            console.log("may you not have read permission or the file not exists:"+path);
        }
    }
    var cur_item = res2[0].substr("/data/root".length);
    walk(_root_dir,cur_item);
    console.log(fileList);
    res.json(fileList);
};