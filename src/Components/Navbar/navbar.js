import AppBar  from "@mui/material/AppBar";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        
    <div>
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="warning" position="static">

                  { isMobile ? (
                    <IconButton>
                        <MenuIcon style={{color:"white"}}></MenuIcon>
                    </IconButton>
                    ) 
                    :
                    (
                        <Toolbar>

                            <Typography variant="h5" >
                                MarketPlace 
                            </Typography>

                            <Typography variant="h5" >
                                Buy 
                            </Typography>

                            <Typography variant="h5"     >
                                Sell 
                            </Typography>
                        </Toolbar>

                    )}
            </AppBar>
        </Box>
        <h1>Navbar</h1>
    </div>);
}
  