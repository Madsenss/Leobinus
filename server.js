const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");

app.use(express.urlencoded({ extended: true }))

app.use(express.json());
var cors = require('cors');
app.use(cors());
var db;


MongoClient.connect('mongodb+srv://admin:narcisse97@cluster0.rwbri54.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
  if (error) return console.log(error);
  db = client.db('leobinus');
  app.listen(8080, () => {
    console.log('server + db start');
  });
});


let multer = require('multer');
const e = require('express');
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }

});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {
      return callback(new Error('PNG, JPG, JPEG만 업로드하세요'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 50
  }
});

app.get('/upload', function (req, res) {
  res.render('upload.ejs')
});

app.post('/upload', upload.array('filename', 20), (req, res) => {
  if (req.body.title == (null || "")) {
    return res.send(`<script type="text/javascript">alert("타이틀 내용이 없습니다"); history.go(-1);</script>`);;
  } else if (req.body.filename == null) {
    return res.send(`<script type="text/javascript">alert("이미지 파일이 없습니다"); history.go(-1);</script>`);;
  } else {

    db.collection('counter').findOne({ name: 'total' }, (error, result) => {
      var totalResult = result.totalPost;

      db.collection('post').insertOne({ _id: (totalResult + 1), category: req.body.category, font:req.body.font , title: req.body.title, src: req.body.filename }, function () {

        db.collection('counter').updateOne({ name: 'total' }, { $inc: { totalPost: 1 } }, (error, result) => {
          if (error) { return console.log(error) }
          res.send(`<script type="text/javascript">alert("게시 완료"); history.go(-1);</script>`);
        });

      });

    });
  }


});
// db에서 받아온 이미지 이름 .확장자로 다중삭제까지 구현.
// 클라이언트가 db에 접근할일이 없으니 파일명을 바꾼다거나 하는 버그는 배제 ( 현재 삭제파일은 1개인데 반복문으로 2개 요청하면 하나는 삭제되고 해당파일 없다고 리턴함. 이부분 고민)
app.delete('/delete', (req, res) => {
  const imagedata = ['logo1.jpg', 'logo2.jpg'];
  console.log(imagedata[0]);
  try {
    for(var i = 0; i < imagedata.length; i++) {
      var testpath = `./public/image/${imagedata[i]}`;
      fs.unlinkSync(testpath);
      console.log(testpath);
    }
    
      
    res.send('삭제 완료');
  } catch (error) {
    res.send('해당 파일이 없습니다');
  }
  // const path = './public/image/logo4.jpg'


})

app.get('/categorys',(req, res)=>{
  db.collection('category').find().toArray((error, result)=>{
    res.send(result).json;
  })
})

app.get('/postdata',(req, res)=>{
  db.collection('post').find().toArray((error, result)=>{
    res.send(result).json;
  })
})

app.get('/image/:imageName', (req, res)=>{
  res.sendFile(__dirname + '/public/image/' + req.params.imageName);
})

// react build 후 페이지
app.use(express.static(path.join(__dirname, 'react-project/build')));
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});