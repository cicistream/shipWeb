var express = require('express');
var router = express.Router();
const db = require('../module/db');

module.exports = function(app) {
  app.get('/home',function(req,res){
    let page = req.query.page;
    var result = [];
    db.pictureModel.find({}, function(err,doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        if(doc.length <= 10*page){
          result = doc.slice(page*10,doc.length-1);
        }
        else{
          result = doc.slice(doc.length-10-10*page,doc.length-10*page);
        }
        return res.json({code: 200, msg:'', data:result});
      }
    })
  })
  app.get('/detail',function(req,res){
    let id = req.query.id;
    db.pictureModel.find({id: req.query.id}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        return res.json({code: 200, msg:'', data: doc[0]})
      }
    })
  })
  app.get('/zone',function(req,res){
    let name = req.query.name;
    db.userModel.findOne({name:req.query.name}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        console.log(name);
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/album/delete',function(req,res){
    let id = req.query.id;
    db.albumModel.findOne({id:req.query.id}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        console.log(name);
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/zone/att',function(req,res){
    let name = req.query.name;
    let idol = req.query.idol;
    let att = req.query.att;
    if(att == 1){
      db.userModel.update({name:req.query.name},{$pull:{
        "idols": req.query.idol
      }},function(err,result){  
        if (err) return console.error(err);  
        console.log(result);  
        });
      db.userModel.update({name:req.query.idol},{$pull:{
        "fans": req.query.name
      }},function(err,result){  
        if (err) return console.error(err);  
        console.log(result);  
        }); 
      console.log('pull')  
    }else{
      db.userModel.update({name:req.query.name},{$push:{
        "idols": req.query.idol 
      }},function(err,result){  
        if (err) return console.error(err);  
        console.log(result);  
        });  
      console.log("push")
      db.userModel.update({name:req.query.idol},{$push:{
        "fans": req.query.name
      }},function(err,result){  
        if (err) return console.error(err);  
        console.log(result);  
        });  
      console.log("push")
    } 
    db.userModel.findOne({name:req.query.name}, function(err, doc){
      if (err) {
        console.log('用户资源出错：' + err);
      } 
      else {
        console.log(doc)
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/zone/myAlbum',function(req,res){
    let id = req.query.id
    db.albumModel.findOne({id:req.query.id}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/zone/like',function(req,res){
    let id = req.query.id
    db.pictureModel.findOne({id:req.query.id}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/album',function(req,res){
    let id = req.query.id
    db.albumModel.findOne({id:req.query.id}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/zone/idol',function(req,res){
    let name = req.query.name
    db.userModel.findOne({name:req.query.name}, function(err, doc){
      if (err) {
        console.log('图片资源出错：' + err);
      } 
      else {
        return res.json({code: 200, msg:'', data: doc})
      }
    })
  });
  app.get('/like',function(req,res){
    let name = req.query.name;
    let id = req.query.id;
    let like = req.query.like;
    db.userModel.update({name:req.query.name}, {$set
    })
  });
  app.get('/login',function(req,res){
    let name = req.query.name
    let pwd = req.query.pwd
    db.userModel.findOne({name:req.query.name}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (!doc) {
          res.json({code: 700, msg:'不存在该用户名：' + name})
          return
        } else {
          if (req.query.pwd != doc.pwd) {
            console.log(doc)
            res.json({code: 700, msg:'密码不正确！'})
            return
          } else {
            res.json({code: 200, msg:'密码正确，登录成功',data: doc})
            console.log(doc)
            return
          }
        }

      }
    })
  });
  app.get('/user',function(req,res){
    let name = req.query.name
    let pwd = req.query.pwd
    db.userModel.findOne({name:req.query.name}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if(doc.pwd!=pwd){
          db.userModel.update({name: req.query.name},{$set:{"pwd":pwd}})
        }
            res.json({code: 200, msg:'修改成功!',data: doc})
            console.log(doc)
          }
    })
  });
  app.get('/newUser',function(req,res){
    let name = req.query.name
    let pwd = req.query.pwd
    if (!name) {
      res.json({code: 600, msg:'name 不能为空！'})
      return
    }
    if (!pwd) {
      res.json({code: 600, msg:'pwd 不能为空！'})
      return
    }
    db.userModel.findOne({name: req.query.name}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (doc) {
          res.json({code: 700, msg:'该用户名名已经被注册：' + name})
          return
        } else {
          db.userModel.create({
            name: name,
            pwd: pwd,
            des: "talk is cheap,show me the code",
            fans:[],
            idols:[],
            likes:[],
            albums:[],
            imgUrl:"http://p8tc04lo6.bkt.clouddn.com/cat.jpeg"
          }, function (err, doc) {
            if (err) {
              res.end('注册失败:' + err)
            } else {
              res.json({code: 200, msg:'用户注册成功：' + name})
              sessionStorage.user = doc;
              return
            }
          })
        }
      }
    })
  });
}
