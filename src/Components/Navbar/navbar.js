import AppBar  from "@mui/material/AppBar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

import { List, ListItem, Divider, Container} from '@mui/material'

function handleMenuIconClick(){
    // show dropdown menu
    let dropdownMenu = document.querySelector('.dropdownMenu')
    if(dropdownMenu.style.display == 'none')
    {
        dropdownMenu.style.display = 'block'
    } 
    else{
        dropdownMenu.style.display ='none'
    }
}

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        
    <div>
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="warning" position="static">

                  { isMobile ? (
                    <span style={{textAlign: 'center'}}>

                        <IconButton onClick={(e) => handleMenuIconClick()}>
                            <MenuIcon style={{color:"white"}} ></MenuIcon>
                        </IconButton>
                        <List class='dropdownMenu'>

                            <ListItem class='dropdownOption'> 
                                <a href='/home'>MarketPlace</a> 
                            </ListItem>

                            <ListItem class='dropdownOption'> 
                                <a href='/buy'>Buy</a> 
                            </ListItem>

                            <ListItem class='dropdownOption'> 
                                <a href='/sell'>Sell</a> 
                            </ListItem>

                        </List>
                    </span>

                    ) 
                    :
                    (
                        <Toolbar>

                            <Typography variant="h5" sx={{marginLeft: 20}}>
                                MarketPlace 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                Buy 
                            </Typography>

                            <Typography variant="h5" sx={{marginLeft: 75}}>
                                Sell 
                            </Typography>
                        </Toolbar>

                    )}
            </AppBar>
        </Box>
    </div>);
}
  