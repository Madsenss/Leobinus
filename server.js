const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(express.urlencoded({ extended: true }))

app.use(express.json());
var cors = require('cors');
app.use(cors());
var db;

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


// DB connect
MongoClient.connect('mongodb+srv://admin:narcisse97@cluster0.rwbri54.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
  if (error) return console.log(error);
  db = client.db('leobinus');
  app.listen(8080, () => {
    console.log('server + db start');
  });
});

// DB 데이터 송신
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


// Test ejs page
app.get('/upload', function (req, res) {
  res.render('upload.ejs')
});

// 이미지 수신, 저장
let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
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


// login 여부 검사
function Login(req, res, next){
  if(req.user){
    next()
  } else {
    res.send('로그인이 필요한 페이지입니다.')
  }
}

// id, pw 검사
passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  session: true,
  passReqToCallback: false,
}, function (id, password, done) {
  db.collection('login').findOne({ id: id }, function (error, result) {
    if (error) return done(error)

    if (!result) return done(null, false, { message: '존재하지 않는 아이디입니다.' })
    if (password == result.pw) {
      return done(null, result)
    } else {
      return done(null, false, { message: '비밀번호가 틀렸습니다.' })
    }
  })
}));


// session 저장
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  done(null, {})
});  


// Login 요청
app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(req, res){
  res.send('good');
});

app.get('/admin', Login, (req, res)=>{
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})

app.get('/posts', Login, (req, res)=>{
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})

app.get('/mail', Login, (req, res)=>{
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('로그아웃 되었습니다.');
  });
});

// 게시물 작성 요청
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


// 게시물 삭제요청
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

app.delete('/test', (req, res)=>{

  console.log(req.body)

  req.body.id = parseInt(req.body.id);
  db.collection('post').findOne({ _id : req.body.id }, (error, result)=>{
    if (error) { return res.send(error) }

    if(typeof result.src == 'string'){
      var imageData = result.src;
      console.log(imageData);
      try{
        fs.unlinkSync(`./public/image/${imageData}`);
        db.collection('post').deleteOne({_id : req.body.id}, (error, result)=>{
          console.log(result);
        })
        res.send('삭제완료');
      }
      catch (error) {
        res.send('해당 파일이 존재하지 않습니다.');
      }
      
    } else {
      var imageData = result.src;
      try{
        for(let i=0; i<imageData.length; i++){
          fs.unlinkSync(`./public/image/${imageData[i]}`);          
        }
        db.collection('post').deleteOne({_id : req.body.id}, (error, result)=>{
          if (error) { return res.send(error) }
          console.log(result);
        })
        res.send('삭제완료');
      }
      catch (error) {
        res.send('해당 파일이 존재하지 않습니다.');
      }
    }
  })
})


// react build 후 페이지
app.use(express.static(path.join(__dirname, 'react-project/build')));
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});