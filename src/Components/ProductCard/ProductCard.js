import { Link, Card, CardActionArea, CardMedia, Divider, CardContent, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Buffer } from 'buffer';
import EditModal from '../EditModal/EditModal';
import Axios from 'axios'

export default function ProductCard(productData)
{
    const userData = productData.UserData
    const isUserOwner = userData.isOwner
    const deleteProductIconStyle = {
        color: 'red',
        cursor: 'pointer',
        '&:hover': {
            color: '#ad0101'
        }
    }

    const editProductIconStyle = {
        color: ' #ed8d07',
        cursor: 'pointer',
        '&:hover': {
            color: '#cc7700'
        }
    }

    const deleteProductHandler = ( product ) => {
        let userID = userData.id
        let productID = product._id
        
        Axios.post('http://localhost:3001/deleteProductAbsolutely', { userID: userID, productID: productID })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log('deleting')
    }
    
    return(
        
            <div class='marketplaceWrapper' style = {{marginLeft: "2%", marginTop: "2%"}}>
                {isUserOwner == false ?
                    <Link href={`/product/${productData.TargetProduct._id}`} underline='none'>
                        <Card sx={{height: "260px", width: "240px"}}>
                            <CardActionArea>
                                <CardMedia>
                                    <img className="MarketplaceIcon" src={`data:${productData.TargetProduct.productImage.contentType};base64, ${Buffer.from(productData.TargetProduct.productImage.data.data).toString('base64')}`}/>
                                </CardMedia>
                                <Divider/>
                                <CardContent>
                                    <Typography>{productData.TargetProduct.productName}</Typography>
                                    <Typography>$ {productData.TargetProduct.productPrice}</Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    :
                    <div>
                    <DeleteIcon sx = {deleteProductIconStyle} onClick = { () => deleteProductHandler(productData.TargetProduct) }/>
                    <EditModal TargetProduct = { productData.TargetProduct } UserData = { userData } />
                    <Link href={`/product/${productData.TargetProduct._id}`} underline='none'>
                        <Card sx={{height: "260px", width: "240px"}}>
                            <CardActionArea>
                                <CardMedia>
                                    <img className="MarketplaceIcon" src={`data:${productData.TargetProduct.productImage.contentType};base64, ${Buffer.from(productData.TargetProduct.productImage.data.data).toString('base64')}`}/>
                                </CardMedia>
                                <Divider/>
                                <CardContent>
                                    <Typography>{productData.TargetProduct.productName}</Typography>
                                    <Typography>$ {productData.TargetProduct.productPrice}</Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div>
                }
            </div>
        )
    }