import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import './errorPage.css'

export default function Error() {
    return(
    <div>
        <Navbar/>
        <div className="errorWrapper">
            <h2>Error 404</h2>
            <h3>The page you're looking for, does not exist</h3>

        </div>
        <Footer/>
    </div>)
}
  