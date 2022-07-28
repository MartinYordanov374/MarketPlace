import {Card, CardActionArea} from '@mui/material'

export default function ViewOption(optionData) {

    return (
        <Card className="ProductsOption" onClick = { () => optionData.clickAction()}>
            <CardActionArea sx={{color: "orange"}}>
                <h1>{optionData.optionName}</h1>
            </CardActionArea>
        </Card>
    )
}