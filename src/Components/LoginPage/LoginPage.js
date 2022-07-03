import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Button from '@mui/material/Button'
import { FormControl, InputLabel, Input, FormHelperText, makeStyles } from '@mui/material';
import './login.css'



export default function Login() {
    return (
    <div>
        <Navbar/>
        <div className="formWrapper">
            
            <FormControl className="FormControl">
                <InputLabel htmlFor="usernameInput">Username</InputLabel>
                <Input id="usernameInput"/>
            </FormControl>

            <FormControl className="FormControl">

                <InputLabel htmlFor="passInput">Password</InputLabel>
                <Input id="passInput"  type="password" />
            </FormControl>

            <Button color="warning" className='loginButton'>Login</Button>
        </div>
        <Footer/>
    </div>);
}
  