import './App.css';

import MainNav from './components/nav.js';
import Posts from './components/posts.js';
import Detail from './components/detail.js';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  let [postData, setPostData] = useState();
  let pathName = window.location.pathname;

  axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
    setPostData(result.data[0].title)
  })
  .catch(() => {
    console.log('데이터 로딩에 실패했습니다.')
  })

  useEffect(() => {
    
  })

  return (

    <div className="App">
      <MainNav />
      <Routes>
        <Route path="/" element={<Posts postData={postData} />} />
        <Route path="*" element={<div>잘못된 요청입니다.</div>} />

        <Route path="/about" element={<div>about</div>} />

        <Route path="/all" element={<Posts />} />
        <Route path="/editorial" element={<Posts postData={postData} />} />
        <Route path="/commercial" element={<Posts postData={postData} />} />
        <Route path="/portrait" element={<Posts postData={postData} />} />

        <Route path="/shop" element={<div>shop</div>} />

        <Route path="/detail" element={<Detail />} />
      </Routes>


    </div >
  );
}

export default App;
