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
import ProductPage from './Components/productPage/ProductPage';
import CartComponent from './Components/CartComponent/CartComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/SearchResults' element={<SearchResults/>}/>
        <Route path='/marketplace/:id' element={<Marketplace/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/MyCart' element={<CartComponent/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

        <Route path='*' element={<Error/>}/>

      </Routes>
    </Router>
  );
}

export default App;
