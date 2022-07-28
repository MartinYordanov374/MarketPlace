import { Link, Card, CardActionArea, CardMedia, Divider, CardContent, Typography} from '@mui/material'
import { Buffer } from 'buffer';

export default function MarketplaceCard(marketplaceData)
{
    return(
        <div class='marketplaceWrapper'>
            <Link href={`/marketplace/${marketplaceData.TargetMarketplace._id}`} underline='none'>
                <Card sx={{height: "260px", width: "240px"}}>
                    <CardActionArea>
                        <CardMedia>
                            <img className="MarketplaceIcon" src={`data:${marketplaceData.TargetMarketplace.marketplaceImage.contentType};base64, ${Buffer.from(marketplaceData.TargetMarketplace.marketplaceImage.data.data).toString('base64')}`}/>
                        </CardMedia>
                        <Divider/>
                        <CardContent>
                            <Typography>{marketplaceData.TargetMarketplace.marketplaceName}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>
    )
}