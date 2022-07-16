import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"

export default function NotLoggedUser()
{
    return (
        <div>
            <Navbar/>
                <div class='loggedOut'>
                    <h1 class='userMessage'>Sorry, this page is accessible by registered users only.</h1>
                </div>
            <Footer/>
        </div>
    )
}

