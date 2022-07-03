import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import  Login  from './Components/LoginPage/LoginPage'
import  Error  from './Components/ErrorPage/ErrorPage'
import  Home  from './Components/HomePage/homePage'
// import {isAuthenticated} from './Express/express'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>

        <Route path='/login' element={<Login/>}></Route>
        <Route path='*' element={<Error/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
