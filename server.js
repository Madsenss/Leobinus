const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
var cors = require('cors');
app.use(cors());

MongoClient.connect('mongodb+srv://admin:narcisse97@cluster0.rwbri54.mongodb.net/?retryWrites=true&w=majority', (error, client)=>{
  if(error) return console.log(error);
  app.listen(8080, ()=>{
    console.log('server + db start');
  });
});

// react build 후 페이지
// app.use(express.static(path.join(__dirname, 'react/build')));
// app.get('/', (req, res)=>{
//   res.sendFile(path.join(__dirname, '/react/build/index.html'));
// });