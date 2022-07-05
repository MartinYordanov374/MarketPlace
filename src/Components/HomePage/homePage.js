import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import React from "react";
Axios.defaults.withCrendentails = true
function checkIfUserIsLoggedIn()
{

    Axios.get('http://localhost:3001/', {withCredentials: true})
    .then()
    .catch()
    // .then((res)=>{
    //     console.log(res.data)
    // })
    // .catch((error)=>{
    //     console.log(error)
    // })

}
export default function Home() {

    React.useEffect(() => {
        checkIfUserIsLoggedIn()
    })

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