import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Name from './components/Name';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Error from './components/Error';
import Email from './components/Email';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Name />}></Route>
          <Route path='/password' element={<Password />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/email' element={<Email />}></Route>
          <Route path='/recovery' element={<Recovery />}></Route>
          <Route path='/reset' element={<Reset />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
