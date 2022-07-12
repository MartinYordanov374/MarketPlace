import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Axios from 'axios'
import {useState, useEffect, useMemo} from 'react'
import './marketplaceStyles.css'

export default function Marketplace ()
{
    // let targetMarketplaceData = getMarketplaceData()

    const [marketplaceData, setMarketplaceData] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log('use effect')
        async function getMarketplaceData()
        {
            let marketplaceID = window.location.href.split('/')[4]
            let targetMarketplaceData = await Axios.post('http://localhost:3001/getMarketplaceById', {marketplaceID: marketplaceID}, {withCredentials: true})
            setMarketplaceData(targetMarketplaceData.data)
            setIsLoading(false)
        }

        getMarketplaceData()
    }, [])

    if(isLoading)
    {
        return (
        <div>
            <Navbar/>
                Loading Data...
            <Footer/>
        </div>)
    }

    else
    {
            return (
            <div>
                <Navbar/>
                    <div className="marketplaceWrapper">
                        <div className="marketplaceBannerWrapper">
                            {/* <img className="marketplaceBanner"></img> */}
                            <div className="marketplaceBanner">

                            </div>
                        </div>

                        <div className="marketplaceDetailsWrapper">
                            <h1 className="marketplaceName"> {marketplaceData.marketplaceName} </h1>
                            <div className="marketplaceDescription"> {marketplaceData.marketplaceDescription} </div>
                        </div>

                    </div>
                    
                    <div className="marketplaceProducts">
                    {
                        marketplaceData.marketplaceProducts.length >= 1 ?
                        marketplaceData.marketplaceProducts.map( (prod) => {
                            return(
                            <div class='marketplaceProduct'>
                                <h1>{prod.productName}</h1>
                                <h1>{prod.productDescription}</h1>
                                <h1>{prod.productPrice}</h1>
                            </div>
                            )
                        })
                        :
                        <h1>No products here</h1>
                    }
                    </div>
                <Footer/>
            </div>
        )
    }
}

