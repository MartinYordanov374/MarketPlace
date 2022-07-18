import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import  Login  from './Components/LoginPage/LoginPage'
import  Error  from './Components/ErrorPage/ErrorPage'
import  Home  from './Components/HomePage/homePage'
import RegisterPage from './Components/RegisterPage/registerPage';
import Marketplace from './Components/Marketplace/marketplacePage';
import ProfilePage from './Components/ProfilePage/profilePage';
import SearchResults from './Components/searchResultsPage/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/SearchResults' element={<SearchResults/>}></Route>
        <Route path='/marketplace/:id' element={<Marketplace/>}></Route>
        <Route path='/profile/:id' element={<ProfilePage/>}></Route>

        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>

        <Route path='*' element={<Error/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
