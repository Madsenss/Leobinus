import './App.css';

import MainNav from './components/nav.js';
import Posts from './components/posts.js';
import Detail from './components/detail.js';
import AdminTab from './components/adminTab';
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
    // <Route path="" element={<></>} />
    <div className="App"> 
      <Routes>
        {/* 사용자 페이지 영역 */}
        <Route path="/" element={<><MainNav /><Posts postData={postData} /></>} />
        <Route path="*" element={<div>잘못된 요청입니다.</div>} />

        <Route path="/about" element={<><MainNav /><div>about</div></>} />

        <Route path="/all" element={<><MainNav /><Posts postData={postData} /></>} />
        <Route path="/editorial" element={<><MainNav /><Posts postData={postData} /></>} />
        <Route path="/commercial" element={<><MainNav /><Posts postData={postData} /></>} />
        <Route path="/portrait" element={<><MainNav /><Posts postData={postData} /></>} />

        <Route path="/shop" element={<><MainNav /><div>shop</div></>} />

        <Route path="/detail" element={<><MainNav /><Detail /></>} />

        {/* 관리자 페이지 영역 */}
        <Route path="/login" element={<div>로그인폼</div>} />
        <Route path="/admin" element={<><div>관리자네비바</div><AdminTab /></>} />
        <Route path="/contect" element={<><div>관리자네비바</div><div>이메일JS</div></>} />
      </Routes>


    </div >
  );
}

export default App;
