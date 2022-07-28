import {Card, CardActionArea} from '@mui/material'

export default function ViewOption(optionData) {
    return (
        <Card className="ProductsOption">
            <CardActionArea sx={{color: "orange"}}>
                <h1>{optionData.optionName}</h1>
            </CardActionArea>
        </Card>
    )
}