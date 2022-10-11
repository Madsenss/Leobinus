const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");

app.use(express.urlencoded({extended: true})) 

app.use(express.json());
var cors = require('cors');
app.use(cors());
var db;


MongoClient.connect('mongodb+srv://admin:narcisse97@cluster0.rwbri54.mongodb.net/?retryWrites=true&w=majority', (error, client)=>{
  if(error) return console.log(error);
  db = client.db('leobinus');
  app.listen(8080, ()=>{
    console.log('server + db start');
  });
});


let multer = require('multer');
const e = require('express');
var storage = multer.diskStorage({

  destination : function(req, file, cb){
    cb(null, './public/image')
  },
  filename : function(req, file, cb){
    cb(null, file.originalname )
  }
  // filefilter : function(req, file, cb){

  // },
  // limits : 1024 * 1024

});

var upload = multer({
  storage : storage,
  fileFilter: (req, file, callback)=>{
    var ext = path.extname(file.originalname);
    if(ext!== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG, JPEG만 업로드하세요'))
    }
    callback(null, true)
  },
  limits:{
    fileSize: 1024 * 1024 * 50
  }
});

app.get('/upload', function(req, res){
  res.render('upload.ejs')
});

app.post('/upload', upload.array('mainimage', 10), (req, res)=>{
  if(req.body.filename == null){
    return res.send(`<script type="text/javascript">alert("이미지 파일이 없습니다"); history.go(-1);</script>`);;
  } else if(req.body.title == (null || "") || req.body.subtitle == (null || "")){
    return res.send(`<script type="text/javascript">alert("타이틀 내용이 없습니다"); history.go(-1);</script>`);;
  } else {

    db.collection('counter').findOne({name : 'total'}, (error, result)=>{
      var totalResult = result.totalPost;
  
      db.collection('post').insertOne({ _id : (totalResult + 1), title : req.body.title, subtitle : req.body.subtitle, category : req.body.category, src : req.body.filename}, function(){
        
        db.collection('counter').updateOne({name : 'total'}, { $inc : {totalPost:1}}, (error, result)=>{
          if(error){return console.log(error)}
          res.send(`<script type="text/javascript">alert("게시 완료"); history.go(-1);</script>`);
        });
  
      });
  
    });
  }
  
  
});

app.delete('/delete', (req, res)=>{
  const path = './public/image/logo4.jpg'

  try {
    fs.unlinkSync(path)
    res.send('삭제 완료');
  } catch(error) {
    res.send('해당 파일이 없습니다');
  }
})
// react build 후 페이지
// app.use(express.static(path.join(__dirname, 'react/build')));
// app.get('/', (req, res)=>{
//   res.sendFile(path.join(__dirname, '/react/build/index.html'));
// });