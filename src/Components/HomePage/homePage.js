import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { ToastContainer } from "react-toastify";
import Axios from "axios";


function checkIfUserIsLoggedIn()
{
    Axios.post('http://localhost:3001/isUserLoggedIn')
    .then((res)=>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.log(error)
    })
}

export default function Home() {
    checkIfUserIsLoggedIn()
    return (
    <div>
        <Navbar/>
            <ToastContainer/>
            <div>
                <h1>Home page</h1>
            </div>
        <Footer/>
    </div>);
}