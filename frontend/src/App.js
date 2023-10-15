import './App.css';

import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage.jsx';

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
  return (
    <div className='App'>
      <MainPage/>
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/my-game-mall/' element={<BasicLayout/>}>
    //       <Route index element={<MainPage/>}/>
    //       {/* <Route path='/product/:productId' element={<DetailPage/>}/> */}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
