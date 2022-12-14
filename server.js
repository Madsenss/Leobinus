const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());
var cors = require('cors');
app.use(cors());
var db;

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
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
app.get('/categorys', (req, res) => {
  db.collection('category').find().toArray((error, result) => {
    res.send(result).json;
  })
})

app.get('/postdata', (req, res) => {
  db.collection('post').find().toArray((error, result) => {
    res.send(result).json;
  })
})

app.get('/maildata', (req, res) => {
  db.collection('mail').find().toArray((error, result) => {
    res.send(result).json;
  })
})

app.get('/image/:imageName', (req, res) => {
  res.sendFile(__dirname + '/image/' + req.params.imageName);
})



// 이미지 수신, 저장
var today = new Date();
var now = today.getTime().toString();
let multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './image')
  },
  filename: function (req, file, cb) {
    cb(null, now + (file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')))
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    var ext = path.extname(now + file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {
      return callback(new Error('PNG, JPG, JPEG만 업로드하세요'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 5000
  }
});

var upload2 = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    var ext = path.extname(now + file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {
      return callback(new Error('PNG, JPG, JPEG만 업로드하세요'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 5000
  }
});


// login 여부 검사
function Login(req, res, next) {
  if (req.user) {
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
app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function (req, res) {
  res.send('good');
});

app.get('/admin', Login, (req, res) => {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})

app.get('/posts', Login, (req, res) => {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})

app.get('/mail', Login, (req, res) => {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.send('로그아웃 되었습니다.');
  });
});


// 게시물 작성 요청
app.post('/upload', upload.array('filename', 50), (req, res) => {

  if (req.body.title == (null || "")) {
    return res.send(`<script type="text/javascript">alert("타이틀 내용이 없습니다"); history.go(-1);</script>`);;
  } else if (req.body.filename == null) {
    return res.send(`<script type="text/javascript">alert("이미지 파일이 없습니다"); history.go(-1);</script>`);;
  } else {

    db.collection('counter').findOne({ name: 'total' }, (error, result) => {
      var totalResult = result.totalPost;
      var setFileName= req.body.filename;
      if(typeof setFileName == 'object'){
        for( let i=0; i<setFileName.length; i++){
          setFileName[i] = now + setFileName[i]
        }
      } else {
        setFileName = now + setFileName;
      }
      db.collection('post').insertOne({ _id: (totalResult + 1), category: req.body.category, font: req.body.font, title: req.body.title, src: setFileName }, function () {

        db.collection('counter').updateOne({ name: 'total' }, { $inc: { totalPost: 1 } }, (error, result) => {
          if (error) { return console.log(error) }
          res.send(`<script type="text/javascript">alert("게시 완료"); history.go(-1);</script>`);
        });

      });
    });

  }
});


// 게시물 삭제요청
app.delete('/delete', (req, res) => {

  req.body.id = parseInt(req.body.id);

  db.collection('post').findOne({ _id: req.body.id }, (error, result) => {
    if (error) { return res.send(error) }

    if (typeof result.src == 'string') {
      var imageData = result.src;
      try {
        fs.unlinkSync(`./image/${imageData}`);
        db.collection('post').deleteOne({ _id: req.body.id }, (error, result) => {
        })
        res.send('삭제완료');
      }
      catch (error) {
        res.send('해당 파일이 존재하지 않습니다.');
      }

    } else {
      var imageData = result.src;
      try {
        for (let i = 0; i < imageData.length; i++) {
          fs.unlinkSync(`./image/${imageData[i]}`);
        }
        db.collection('post').deleteOne({ _id: req.body.id }, (error, result) => {
          if (error) { return res.send(error) };
        })
        res.send('삭제완료');
      }
      catch (error) {
        res.send('해당 파일이 존재하지 않습니다.');
      }
    }
  })
})

// 게시물 수정 요청
app.post('/modify', upload2.array('filename', 20), (req, res) => {

  req.body.id = parseInt(req.body.id);

  if (req.body.title == (null || "")) {

    return res.send(`<script type="text/javascript">alert("타이틀 내용이 없습니다"); history.go(-1);</script>`);;

  // 이미지 제외 수정
  } else if (req.body.filename == null) {

    return db.collection('post').updateOne({ _id: req.body.id }, { $set: { category: req.body.category, font: req.body.font, title: req.body.title } }, (error, result) => {
      
      if (error) { return res.send(error) };   
      res.send(`<script type="text/javascript">alert("수정 완료"); history.go(-1);</script>`);

    })
  // 이미지 포함 수정
  } else {

    db.collection('post').findOne({ _id: req.body.id }, (error, result) => {

      if (error) { return res.send(error) }

      var imageData = result.src;

      var setFileName= req.body.filename;

      if(typeof setFileName == 'object'){
        for( let i=0; i<setFileName.length; i++){
          setFileName[i] = now + setFileName[i]
        }
      } else {
        setFileName = now + setFileName;
      }

      if (typeof result.src == 'string') {
              
        try {     
          fs.unlinkSync(`./image/${imageData}`);
          db.collection('post').updateOne({ _id: req.body.id }, { $set: { category: req.body.category, font: req.body.font, title: req.body.title, src: setFileName } }, (error, result) => {
            if (error) { return res.send(error) };
            
            res.send(`<script type="text/javascript">alert("수정 완료"); history.go(-1);</script>`);
          })
        }
        catch (error) {
          res.send('해당 파일이 존재하지 않습니다.');
        }
  
      } else {

        try {
          for (let i = 0; i < imageData.length; i++) {
            fs.unlinkSync(`./image/${imageData[i]}`);
          }
          db.collection('post').updateOne({ _id: req.body.id }, { $set: { category: req.body.category, font: req.body.font, title: req.body.title, src: setFileName } }, (error, result) => {
            if (error) { return res.send(error) };
            res.send(`<script type="text/javascript">alert("수정 완료"); history.go(-1);</script>`);
          })         
        }
        catch (error) {
          res.send('해당 파일이 존재하지 않습니다.');
        }
      }
    })
  }

})


// 탭 추가
app.post('/addtab', (req, res)=>{
  db.collection('category').find().toArray((error, result)=>{
    db.collection('category').insertOne({ category : req.body.data.category, ordernum : result.length + 1}, (error, result)=>{
      if(error) { return res.send(error) }
      res.send('생성 완료');
    })
  })
})


// 탭 삭제
var allsrc = [];
app.delete('/deltab', (req, res)=>{
  db.collection('login').find().toArray((error, result)=>{
    if(req.body.password == result[0].pw){
      
      db.collection('post').find({category : req.body.category}).toArray((error, result)=>{

        if(result.length === 0){
    
          db.collection('category').deleteOne({category : req.body.category},(error, result)=>{
            if(error) { return res.send(error) }
            return res.send('카테고리가 삭제되었습니다.');
          })
    
        } else {
    
          for(let i=0; i<result.length; i++){
            if(typeof result[i].src === 'string'){
              allsrc.push(result[i].src);
            } else if(typeof result[i].src ==='object'){
              allsrc.push(...result[i].src);
            }
          }
    
          for(let i=0; i<allsrc.length; i++){
            fs.unlinkSync(`./image/${allsrc[i]}`);
          }
    
          db.collection('post').deleteMany({category : req.body.category},(error, result)=>{
            if(error) { return res.send(error) }
            console.log('good');
          })
    
          db.collection('category').deleteOne({category : req.body.category},(error, result)=>{
            if(error) { return res.send(error) }
            return res.send('카테고리가 삭제되었습니다.');
          })
    
        }
      })

    } else {
      res.send('비밀번호가 일치하지 않습니다.');
    }
  })

})

// 탭 순서 수정
app.post('/motab', (req, res)=>{

  for(let i=0; i<Object.keys(req.body).length; i++){
    db.collection('category').updateOne({category : Object.keys(req.body)[i]}, { $set: { ordernum : parseInt(Object.values(req.body)[i]) } }, (error, result)=>{
      if(error) { return res.send(error) }
    });
  }

  res.send(`<script type="text/javascript">alert("변경 완료"); history.go(-1);</script>`);
})




// 메일
var time = today.toLocaleString();
var utc = today.getTime();
app.post('/mail', (req, res)=>{
  var result = req.body.data;
  db.collection('mail').insertOne({ name : result.name, email : result.email, phone : result.phone, message : result.message, time : time, utc : utc}, (error, result)=>{
    if(error) {return res.send(error)};
  })
  res.send('감사합니다. 빠른 시일 내에 연락드리겠습니다.');
})

app.delete('/delmail', (req, res)=>{
  req.body.utc = parseInt(req.body.utc);
  db.collection('mail').deleteOne({utc : req.body.utc}, (error, result)=>{
    if(error) {return res.send(error)}
    res.send('메일이 삭제되었습니다.');
  })
})

// react build 후 페이지
app.use(express.static(path.join(__dirname, 'react-project/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});


