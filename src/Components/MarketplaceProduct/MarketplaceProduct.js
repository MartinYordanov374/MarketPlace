import {Button, Card, CardActionArea, CardContent, Divider, CardMedia} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import React from 'react'

import { Buffer } from 'buffer';
import './marketplaceProductStyling.css'
export default function MarketplaceProduct (data)
{
    return(
        <div class='marketplaceProduct'>

            <Card className='productCard'>
                <CardActionArea  href={`/product/${data.prod._id}`}>
                    <CardContent>
                        <CardMedia>
                            <img className="productIcon" 
                            width="480px"
                            height="240px"
                            src={`data:${data.prod.productImage.contentType};base64, 
                            ${Buffer.from(data.prod.productImage.data.data).toString('base64')}`}/>
                        </CardMedia>
                        <Divider/>

                        <h2 className="productName">{data.prod.productName}</h2>
                        <Divider/>

                        <h3 className="productDescription">{
                            data.prod.productDescription.length >= 120 ?
                        data.prod.productDescription.slice(0,120) + '...'
                        :
                        data.prod.productDescription
                        }</h3>
                    </CardContent>
                    
                </CardActionArea>
                <Divider/>
                <p className="productPrice"><strong>$ {data.prod.productPrice}</strong></p>
                <Divider/>
                <Button className="buyProductButton" sx={{fontSize: 15}} color='warning'> <strong> Add to cart </strong> <AddShoppingCartIcon/>  </Button>
            </Card>
        </div>
    )
}