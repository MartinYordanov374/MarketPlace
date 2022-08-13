import { Box, Grid } from '@mui/material';
import './footer.css'
export default function Footer() {
    return (
        <Box>
            <Grid className='footer' container spacing={2}  
            style={{
                borderStyle: 'solid', 
                textAlign: 'center', 
                // position: 'absolute', 
                bottom: '0',
                marginTop: '2%',
                backgroundColor: "#ed6c02", 
                color: 'white', 
                fontWeight: '400', 
                fontSize: '1.5rem',
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            }}>

                <Grid item xs={6}>
                    <div>
                        <h3>Directions</h3>
                        <div className="Directions">
                            <ul>
                                <a href='/'>Home</a>
                            </ul>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div>
                        <h3>About us</h3>
                        <div className="About">
                            <span className='AboutDescription'>
                                <p>Marketplace is an online marketplace community, where you can buy and sell products.</p> 
                                <p>You can start your own marketplace - right here, right now!</p>
                                <p>Expand your business with us on MarketPlace!</p>

                            </span>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={14} style={{backgroundColor: '#171820', paddingRight: '10%'}}>
                    <div className='copyrightWrapper'>
                        <span className='copyrightInfo'>© Copyright Martin Yordanov - 2022</span>
                    </div>
                </Grid>

            </Grid>


        </Box>
    );
}
  