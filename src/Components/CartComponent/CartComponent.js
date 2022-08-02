import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import { Buffer } from 'buffer';
import {Card, CardActionArea, Typography, Button, Divider, Box} from '@mui/material'
export default function CartComponent() {

    const items = JSON.parse(localStorage.getItem('productsInCart'))

    const productLeftMenuStyle = {

    }

    const productRightMenuStyle = {
        width: "20%"

    }

    const CartContentWrapperStyle = {
        display: "flex",
        marginLeft: "25%"
    }
    return (
        <Box className="MyCartWrapper">
            <Navbar/>
                <Box className="MyCartContent">
                    {items && items.map((product) => {
                        return (
                        <Box className="shoppingCartProductWrapper" sx = { CartContentWrapperStyle }>

                            <Card className="productLeftMenu" sx = { productLeftMenuStyle }>
                                <img
                                    src={
                                        `data: image/jpg;base64,
                                        ${Buffer.from(product.productImage.data).toString('base64')}`
                                    }
                                    width="140px"
                                />

                                <Typography variant="h6">
                                    {"$ " + product.productPrice.toFixed(2)}
                                </Typography>

                                <Divider/>
                            </Card>

                            <Card className="productRightMenu" sx = { productRightMenuStyle }>
                                <Typography variant="h6">
                                    {product.productName}
                                </Typography>
                                <Typography variant="h6">
                                    {product.productDescription}
                                </Typography>
                            </Card>

                        </Box>)
                    })}
                </Box>
            <Footer/>
        </Box>


    )
}