// setting
import { Route, Routes } from 'react-router-dom';

// main
import Main from './components/main/Main';

// board
import BoardList from "./components/board/BoardList";
import BoardDetail from "./components/board/BoardDetail";
import BoardJoin from "./components/board/BoardJoin";
import BoardModify from "./components/board/BoardModify";
import BoardTemp from "./components/board/Temp";

// lifestyle
import UrbanIsland from './components/jaehun/js/UrbanIsland';

// login
import Login from './components/sub/Login';

// scss
import './App.css'

// room
import Room from './components/lkm/Room';
import Standard from './components/lkm/Standard';

function App() {

  return (
    <div>
      <Routes>
        {/* 메인 */}
        <Route path='/' element={<Main></Main>}></Route>
        {/* 로그인 */}
        <Route path='/login' element={<Login></Login>}></Route>

      
      
        {/* 고객센터 */}
        <Route path="/board" element={<BoardTemp/>} >
          <Route path="" element={<BoardList/>} />
          <Route path="detail/:num" element={<BoardDetail/>} />
          <Route path="join" element={<BoardJoin/>} />
          <Route path="modify/:num" element={<BoardModify/>} />
        </Route>
      </Routes>

      <Routes>
<<<<<<< HEAD
          <Route path="/room" element={<Room />} />
          <Route path="/room/delux" element={<Standard />} />
=======

        <Route path="/room" element={<Room />} />

        <Route path='/urbanIsland' element={<UrbanIsland/>}></Route>

>>>>>>> master
      </Routes>

    </div>
  );
}

export default App;