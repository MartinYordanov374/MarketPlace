import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Axios from 'axios'

import {useState, useEffect} from 'react'

export default function Marketplace ()
{
    // let targetMarketplaceData = getMarketplaceData()

    const [marketplaceData, setMarketplaceData] = useState([])

    useEffect(() => {
        accessMarketplaceData()
    }, [])

    const accessMarketplaceData = async() => {
        let targetMarketplace = await getMarketplaceData()
        setMarketplaceData(targetMarketplace.data)
    }

    console.log(marketplaceData)



    return (
        <div>
            <Navbar/>
                <div>
                    <h1></h1>
                </div>
            <Footer/>
        </div>
    )
}


function getMarketplaceData()
{
    let marketplaceID = window.location.href.split('/')[4]

    return Axios.post('http://localhost:3001/getMarketplaceById', {marketplaceID: marketplaceID}, {withCredentials: true})

    
}