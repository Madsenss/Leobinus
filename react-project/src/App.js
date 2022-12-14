import './App.css';

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import axios from 'axios'

import MainNav from './components/nav.js';
import Posts from './components/posts.js';
import Detail from './components/detail.js';
import AdminTab from './components/adminTab.js';
import AdminNav from './components/adminNav.js';
import Login from './components/login.js';
import About from './components/about.js';
import Mail from './components/mail';

function App() {
  let [categorys, setCategorys] = useState();
  let [postData, setPostData] = useState();
  let [mailData, setMailData] = useState();


  useEffect(() => {
    axios.get('/categorys').then((result) => {
      setCategorys(result.data);
    })
    .catch(() => {
      console.log('카테고리 로딩에 실패했습니다.')
    })

    axios.get('/postdata').then((result) => {
      setPostData(result.data); 
    })
    .catch(() => {
      console.log('데이터 로딩에 실패했습니다.')
    })

    axios.get('/maildata').then((result) => {
      setMailData(result.data); 
    })
    .catch(() => {
      console.log('데이터 로딩에 실패했습니다.')
    })

  }, [])


  return (
    <div className="App">
      <Routes>
        {/* 사용자 페이지 영역 */}
        <Route path="/" element={<><MainNav categorys={categorys} /><Posts categorys={categorys} postData={postData} /></>} />
        <Route path="*" element={<div>잘못된 요청입니다.</div>} />

        <Route path="/about" element={<><MainNav categorys={categorys} /><About /></>} />

        <Route path="/all" element={<><MainNav categorys={categorys} /><Posts categorys={categorys} postData={postData} /></>} />
        {
          categorys && categorys.map((item, i)=>{
            return(
              <Route key={i} path={`/${item.category}`} element={<><MainNav categorys={categorys} /><Posts categorys={categorys} postData={postData} /></>} />
            )
          })
        }
        <Route path="/shop" element={<><MainNav categorys={categorys} /><div>shop</div></>} />

        <Route path="/detail/:id" element={<><MainNav categorys={categorys} /><Detail postData={postData} /></>} />

        {/* 관리자 페이지 영역 */}
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<><AdminNav mailData={mailData} categorys={categorys} /><AdminTab postData={postData} categorys={categorys}/></>}/>
        <Route path="/posts" element={<><AdminNav mailData={mailData} categorys={categorys} /><AdminTab postData={postData} categorys={categorys}/></>}/>
        <Route path="/mail" element={<><AdminNav mailData={mailData} categorys={categorys} /><Mail mailData={mailData}/></>}/>

      </Routes>
    </div >
  );
}

export default App;
