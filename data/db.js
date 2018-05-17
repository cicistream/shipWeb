const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pictureData = require('./picture.json')
const userData = require('./userData.json')
mongoose.connect('mongodb://127.0.0.1:27017/shipWeb');
// 用户信息的数据结构模型
const userSchema = new Schema({
  name: {type: String},
  pwd: {type: String},
  time: {type: Date, default: Date.now}
})
// 商品的的数据结构模型
const pictureSchema = new Schema({
  id: Number,
  name: String,
  author: String,
  imgUrl: String,
  des: String,
  like: Number,
  collect: Number,
  authorUrl: String,
  albumUrl: String
})
// 画集的的数据结构模型
const albumSchema = new Schema({
  id: Number,
  name: String,
  author: String,
  imgUrl: String,
  des: String,
  hasPic: Number,
  attention: Number,
  authorUrl: String
});

mongoose.Promise = global.Promise;
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  initData();
});

const db = {
  userModel: database.model('userModel', userSchema),
  pictureModel: database.model('pictureModel', pictureSchema),
  albumModel: database.model('albumModel', albumSchema),
}

const initData = function () {
  // 初始化picture
  db.pictureModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (doc.length) {
      console.log('db pictureModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      pictureData.map(pic => {
        db.pictureModel.create(pic)
      })
      console.log(pictureData)

    } else {
      console.log('db open not first time');
    }
  })
  // 为用户name15011760730初始化购物车内容
  db.userModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (doc.length) {
      console.log('db userModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      userData.map(user => {
        db.userModel.create(user)
      })
      // console.log(picture)

    } else {
      console.log('db open not first time');
    }
  })
}

module.exports = db