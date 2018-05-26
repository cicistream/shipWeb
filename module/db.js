const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pictureData = require('./picture.json')
const userData = require('./user.json')
const albumData = require('./album.json')
mongoose.connect('mongodb://127.0.0.1:27017/shipWeb');
// 用户信息的数据结构模型
const userSchema = new Schema({
  id:  String,
  pwd:  String,
  imgUrl:  String,
  des:  String,
  albums: Array,
  likes:  Array,
  idols:  Array,
  fans:  Array
})
// 商品的的数据结构模型
const pictureSchema = new Schema({
  id: Number,
  name: String,
  imgUrl: String,
  des: String,
  author: String,
  authorUrl: String,
  like: Number,
  collect: Object,
  albumUrl: String,
  tags: Array,
})
// 画集的的数据结构模型
const albumSchema = new Schema({
  id: Number,
  name: String,
  imgUrl: String,
  des: String,
  author: String,
  authorUrl: String,
  hasPic: Array,
  fans: Array,
  tags: Array,
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
    } else if (!doc.length) {
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
  db.albumModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db albumModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      
      albumData.map(pic => {
        db.albumModel.create(pic)
      })
      console.log(albumData)

    } else {
      console.log('db open not first time');
    }
  })
  // db.userModel.remove({});
  db.userModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db userModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      userData.map(user => {
        db.userModel.create(user)
      })
      console.log(userData)

    } else {
      console.log(userData)
      console.log('db open not first time');
    }
  })
}

module.exports = db