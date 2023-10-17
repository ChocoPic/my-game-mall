import './App.css';

import {Route, Routes, Outlet} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage/index.jsx';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import IsAuth from './components/IsAuth';
import NotAuth from './components/NotAuth';
import { useEffect, useState } from 'react';

function BasicLayout(){
  return (
    <div className="App">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

function App() {
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem("isAuth") || "false");
  
  useEffect(()=>{
    if(isAuth) {
      setIsAuth(isAuth)
    }
  },[]);

  return (
      <Routes>
        <Route path='/' element={<BasicLayout/>}>
          <Route index element={<MainPage/>}/>
          {/* <Route path='/product/:productId' element={<DetailPage/>}/> */}
        </Route>

        {/* 인증안된 사용자 false면 접근가능 */}
        <Route element={<NotAuth isAuth={isAuth}/>}>
          <Route path='/login' element={<LoginPage/>}/>
        </Route>

        {/* 인증된 사용자 true면 접근가능 */}
        <Route element={<IsAuth isAuth={isAuth}/>}>
          <Route path='/upload' element={<UploadPage/>}/>
        </Route>
      </Routes>
  );
}

export default App;
