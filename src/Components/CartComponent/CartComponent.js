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
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "5%"
    }
    const productNameStyle = {
        marginLeft: "10%",
        marginRight: "5%",
        marginTop: "2%",
    }

    const productDescriptionStyle = {
        marginLeft: "10%",
        marginRight: "5%",
        marginTop: "5%",
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
                                <Typography variant="h6" sx = { productNameStyle }>
                                    {product.productName}
                                </Typography>
                                <Divider/>
                                <Typography variant="h6" sx = { productDescriptionStyle }>
                                {product.productDescription.length >= 120 ?
                                     product.productDescription.slice(0,120) + '...'
                                    :
                                    product.productDescription}
                                </Typography>
                            </Card>

                        </Box>)
                    })}
                </Box>
            <Footer/>
        </Box>


    )
}