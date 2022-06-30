import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import  Login  from './Components/LoginPage/LoginPage'
import  Error  from './Components/ErrorPage/ErrorPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='*' element={<Error/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
