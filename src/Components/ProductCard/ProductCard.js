import { Link, Card, CardActionArea, CardMedia, Divider, CardContent, Typography} from '@mui/material'
import { Buffer } from 'buffer';
export default function ProductCard(productData)
{
    return(
            <div class='marketplaceWrapper'>
                <Link href={`/marketplace/${productData.TargetProduct._id}`} underline='none'>
                    <Card sx={{height: "260px", width: "240px"}}>
                        <CardActionArea>
                            <CardMedia>
                                <img className="MarketplaceIcon" src={`data:${productData.TargetProduct.productImage.contentType};base64, ${Buffer.from(productData.TargetProduct.productImage.data.data).toString('base64')}`}/>
                            </CardMedia>
                            <Divider/>
                            <CardContent>
                                <Typography>{productData.TargetProduct.marketplaceName}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </div>
        )
    }