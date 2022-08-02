import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"
import Axios from 'axios'
import {useState, useEffect } from 'react'
import './marketplaceStyles.css'
import {Card, CardActionArea, Typography, Button, Divider, Modal, Fade, Box} from '@mui/material'

import SellIcon from '@mui/icons-material/Sell';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from 'buffer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NotLoggedUser from "../NotLoggedUser/notLogged";
import SettingsIcon from '@mui/icons-material/Settings';
import ReviewModal from '../ReviewModal/reviewModal'
import MarketplaceProduct from "../MarketplaceProduct/MarketplaceProduct";
import MarketplaceReview from "../MarketplaceReview/MarketplaceReview";
import ProductsModal from "../productsModal/productsModal";
import {Rating} from 'react-simple-star-rating'   

export default function Marketplace ()
{
    // TODO SORT MARKERPLACE REVIEWS BY RATING
    // TODO ADD STAR RATING TO ALL VIEWS (OWNER, NON-OWNER ETC.)

    let [loginStatus, setLoginStatus] = useState('')

    const [marketplaceData, setMarketplaceData] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [isUserOnProducts, setIsUserOnProducts] = useState(true)

    const [isUserOwner, setIsUserOwner] = useState(false)

    const [userData, setUserData] = useState('')

    let [marketplaceModalSettingsState, setMarketplaceModalSettingsState] = useState(false)

    let [deleteMarketplaceConfirmationModalState, setDeleteMarketplaceConfirmationModalState] = useState(false)

    let marketplaceID = window.location.href.split('/')[4]

    useEffect(() => {
        async function getMarketplaceData()
        {
            let targetMarketplaceData = await Axios.post('http://localhost:3001/getMarketplaceById', {marketplaceID: marketplaceID}, {withCredentials: true})
            setMarketplaceData(targetMarketplaceData.data.targetMarketplace)
            setIsLoading(false)
            setIsUserOwner(targetMarketplaceData.data.isCurrentUserOwner)
        }
        
        
        Axios.get('http://localhost:3001/isUserLoggedIn', {withCredentials: true})
        .then((res)=>{
            if(res.data == true)
            {
                setLoginStatus(true)
            }
            else
            {
                setLoginStatus(false)
            }
        })
        .catch((error)=>{
            // console.log(error)
        })

        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
            setUserData(res.data.user)
        })
        .catch((err) => {
            console.log(err)
        })

        getMarketplaceData()
    }, [])
    
    const handleRating = (rate) => {

        switch(rate){
            case 20:
                rate = 1
                break;
            case 40:
                rate = 2
                break;
            case 60:
                rate = 3
                break;
            case 80:
                rate = 4
                break;
            case 100:
                rate = 5
                break;
        }
        let ratingReceiverId = marketplaceID
        let ratingAdderId = userData.id
        let ratingAmount =  rate

        Axios.post('http://localhost:3001/addMarketplaceRating', {ratingAdderId: ratingAdderId, ratingReceiverId: ratingReceiverId, ratingAmount: ratingAmount})
        .then((res) => {
            toast.success(res.data)
        })
        .catch((err) => {
            toast.warn(err.response.data)
        })

    }

    const handleMarketplaceView = () => {
        if(isUserOnProducts == true)
        {
            setIsUserOnProducts(false)
        }
        else
        {
            setIsUserOnProducts(true)
        }
    }

    const openSettingsModal = () => {
        setMarketplaceModalSettingsState(true)
    }
    
    const closeSettingsModal = () => {
        setMarketplaceModalSettingsState(false)
    }

    const closeDeleteMarketplaceModal = () => {
        setDeleteMarketplaceConfirmationModalState(false)

    }

    const openDeleteConfirmationModal = () => {
        setDeleteMarketplaceConfirmationModalState(true)
    }

    const deleteMarketplace = () => {
        setMarketplaceModalSettingsState(false)

        // let userID = 
        async function getUserData(){
            let currentSession = await Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
            let userID = currentSession.data.user.id
            let targetMarketplaceID = marketplaceID

            Axios.post('http://localhost:3001/deleteMarketplace', {userID: userID, marketplaceID: targetMarketplaceID})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('deleting')
        }
        getUserData()

    }

    const ModalStyle = {
        position: 'absolute',
        top: '35%',
        left: '51%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const deleteMarketplaceButtonStyle = {
        color: 'red', 
        borderColor: 'red', 
        marginTop: "2%",
        marginLeft: "20%"
      }

      const marketplaceSettingsTitleStyle = {
        marginLeft: "15%"
      }

      const deleteMarketplaceConfirmationTitleStyle = {
        color: 'red',
        fontSize: 35,
        textAlign: 'center'
      }
      const deleteMarketplaceConfirmationMessageStyle = {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
      }

      const confirmDeleteMarketplaceButtonStyle = {
        color: 'red', 
        borderColor: 'red', 
        marginTop: "2%",
        marginLeft: "10%"
      }

    if(isLoading)
    {
        return (
        <div>
            <Navbar/>
                <div className="loadingCircleWrapper">
                    <CircularProgress className="loadingCircle" color="warning" />
                    <h2>Loading data...</h2>
                </div>
            <Footer/>
        </div>)
    }

    else
    {
        if(loginStatus == true)
        {
            return (
            <div>
                <Navbar/>
                <ToastContainer/>
                {isUserOwner == false 
                ? 
                <div className="nonOwnerMarketplaceView">
                    <div className="marketplaceWrapper">
                        <div className="marketplaceBannerWrapper">
                            <img className="marketplaceBanner" src={`data:${marketplaceData.marketplaceImage.contentType};base64, ${Buffer.from(marketplaceData.marketplaceImage.data.data).toString('base64')}`}/>
                        </div>

                        <div className="marketplaceDetailsWrapper">
                            <h1 className="marketplaceName"> {marketplaceData.marketplaceName} </h1>
                            <Rating
                                transition
                                onClick={handleRating}
                                size={25}
                            />
                            <div className="marketplaceOwner"> 
                               <span>
                                    By: &nbsp; <a className="marketplaceOwnerProfileLink" href={'/profile/' + marketplaceData.marketplaceOwner._id}> 
                                        {marketplaceData.marketplaceOwner.username}
                                    </a>
                                </span> 
                            </div>


                            <div className="marketplaceDescription"> 
                                <span className="marketplaceDescriptionSpan">
                                    {marketplaceData.marketplaceDescription} 
                                </span>
                            </div>

                            <div className="marketplaceTagsWrapper">
                                {marketplaceData.marketplaceTags.map((tag) => {
                                    return ( 
                                        <div className="marketplaceTagWrapper">
                                            <span className="marketplaceTag"> <SellIcon className='tagIcon'/> {tag}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    <Divider/>
                    <div>
                        {
                            isUserOnProducts == true ?
                                <div className="marketplaceViewOptions">
                                    <Card className="ProductsOption">
                                        <CardActionArea sx={{color: "orange"}} onClick={() => handleMarketplaceView()}>
                                            <h1>Products</h1>
                                        </CardActionArea>
                                    </Card>
                                    
                                    <Card className="ReviewsOption">
                                        <CardActionArea onClick={() => handleMarketplaceView()}>
                                            <h1>Reviews</h1>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            :
                                <div className="marketplaceViewOptions">
                                    <Card className="ProductsOption">
                                        <CardActionArea onClick={() => handleMarketplaceView()}>
                                            <h1>Products</h1>
                                        </CardActionArea>
                                    </Card>
                                    <Card className="ReviewsOption">
                                        <CardActionArea sx={{color: "orange"}} onClick={() => handleMarketplaceView()}>
                                            <h1>Reviews</h1>
                                        </CardActionArea>
                                    </Card>
                                </div>
                        }
                    </div>
                    
                    {
                        isUserOnProducts ? 
                        <div className="marketplaceProducts">
                            {
                                marketplaceData.marketplaceProducts.length >= 1 ?
                                marketplaceData.marketplaceProducts.map( (prod) => {
                                    return(
                                        <MarketplaceProduct prod={prod}/>
                                    )
                                })
                                :
                                <ProductsModal MarketplaceData = { marketplaceData } UserData = { userData }/>
                            }
                        </div>
                        :
                        <div className="marketplaceReviews">
                            {marketplaceData.marketplaceReviews.some((review) => review.reviewOwner._id == userData.id) == false ?
                            <div>
                                    <ReviewModal userData={ userData } marketplaceData = { marketplaceData }/>
                                    <Divider/>    
                            </div>                        
                            :
                            ""
                            }
                            { marketplaceData.marketplaceReviews.length >= 1 ?
                                marketplaceData.marketplaceReviews.map((review) => {
                                    return ( 
                                        <MarketplaceReview targetReview = { review } marketplaceData = { marketplaceData } /> 
                                    )
                                })
                                :
                                ""
                            }
                        </div>
                    }
                </div>
                :
                <div className="ownerMarketplaceView">
                    <div className="marketplaceWrapper">
                        <div className="marketplaceBannerWrapper">
                        <img className="marketplaceBanner" src={`data:${marketplaceData.marketplaceImage.contentType};base64, ${Buffer.from(marketplaceData.marketplaceImage.data.data).toString('base64')}`}/>
                        </div>

                        <div className="marketplaceDetailsWrapper">
                            <h1 className="marketplaceName"> {marketplaceData.marketplaceName} </h1>
                            <Rating
                                transition
                                onClick={handleRating}
                                size={25}
                            />
                            {
                                marketplaceData.marketplaceRating.reduce((a,b) =>  a + b.ratingAmount, 0) / marketplaceData.marketplaceRating.length >= 1 
                                ?
                                <h3> Rating: {(marketplaceData.marketplaceRating.reduce((a,b) =>  a + b.ratingAmount, 0) / marketplaceData.marketplaceRating.length).toFixed(2)} / 5.00 </h3>
                                :
                                <h3> Rating: 0.00 / 5.00 </h3>

                            }
                            <div className="marketplaceOwner">                                
                                <span>
                                    By: &nbsp; <a className="marketplaceOwnerProfileLink" href={'/profile/' + marketplaceData.marketplaceOwner._id}> 
                                        {marketplaceData.marketplaceOwner.username} 
                                    </a>
                                </span>  
                            </div>

                            <div className="marketplaceDescription"> 
                                <span className="marketplaceDescriptionSpan">
                                    {marketplaceData.marketplaceDescription} 
                                </span>
                            </div>

                            <div className="marketplaceTagsWrapper">
                                {marketplaceData.marketplaceTags.map((tag) => {
                                    return ( 
                                        <div className="marketplaceTagWrapper">
                                            <span className="marketplaceTag"> <SellIcon className='tagIcon'/> {tag}</span>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="marketplaceSettingsWrapper">
                            <SettingsIcon className="marketplaceSettingsIcon" onClick={() => openSettingsModal()}/>

                            <Modal open={marketplaceModalSettingsState} onClose={closeSettingsModal}>
                                <Fade in = {marketplaceModalSettingsState}>
                                    <Box sx={ModalStyle}>
                                        <Typography sx={marketplaceSettingsTitleStyle} variant="h5"> Your marketplace settings</Typography>
                                        <Divider/>
                                        <div className="marketplaceSettings">
                                            <Button variant="outlined" color='warning' sx={deleteMarketplaceButtonStyle} onClick={() => openDeleteConfirmationModal()}>  Delete Marketplace 
                                                <DeleteOutlineIcon className="marketplaceDeleteIcon"/>
                                            </Button>

                                        </div>
                                    
                                    </Box>
                                </Fade>
                            </Modal>

                            <Modal open={deleteMarketplaceConfirmationModalState} onClose={closeDeleteMarketplaceModal}>
                                <Fade in = {deleteMarketplaceConfirmationModalState}>
                                    <Box sx={ModalStyle}>
                                        <Typography variant="h6" sx={deleteMarketplaceConfirmationTitleStyle}> STOP! </Typography>
                                        <br></br>
                                        <Typography sx={deleteMarketplaceConfirmationMessageStyle}> All the data related to this marketplace will be lost! </Typography>
                                        <Divider/>
                                        <div className="marketplaceSettings">
                                            <Button variant="outlined" color='warning' sx={confirmDeleteMarketplaceButtonStyle} onClick={() => deleteMarketplace()}>  Confirm Marketplace Deletion  
                                                <DeleteOutlineIcon className="marketplaceDeleteIcon"/>
                                            </Button>

                                        </div>
                                    
                                    </Box>
                                </Fade>
                            </Modal>
                        </div>

                    </div>
                    <Divider/>
                    <div>
                        {
                            isUserOnProducts == true ?
                            <div className="marketplaceViewOptions">
                                <Card className="ProductsOption">
                                    <CardActionArea sx={{color: "orange"}} onClick={() => handleMarketplaceView()}>
                                        <h1>Products</h1>
                                    </CardActionArea>
                                </Card>
                                <Card className="ReviewsOption">
                                    <CardActionArea onClick={() => handleMarketplaceView()}>
                                        <h1>Reviews</h1>
                                    </CardActionArea>
                                </Card> 
                            </div>
                            :
                            <div className="marketplaceViewOptions">
                                <Card className="ProductsOption">
                                    <CardActionArea onClick={() => handleMarketplaceView()}>
                                        <h1>Products</h1>
                                    </CardActionArea>
                                </Card>
                                <Card className="ReviewsOption">
                                    <CardActionArea sx={{color: "orange"}} onClick={() => handleMarketplaceView()}>
                                        <h1>Reviews</h1>
                                    </CardActionArea>
                                </Card>
                            </div>
                        }
                    </div>
                        { isUserOnProducts ? 
                                    <div className="marketplaceProducts">
                                    {
                                        marketplaceData.marketplaceProducts.length >= 1 ?
                                        marketplaceData.marketplaceProducts.map( (prod) => {
                                            return(
                                                <MarketplaceProduct prod = { prod }/>
                                            )
                                        })
                                        :
                                        <ProductsModal MarketplaceData = { marketplaceData } UserData = { userData }/>

                                    }
                                    </div>
                                    :
                                    <div className="marketplaceReviews">
                                        {marketplaceData.marketplaceReviews.some((review) => review.reviewOwner._id == userData.id) == false ?
                                        <div>
                                            <div className='addReviewWrapper'>
                                                <ReviewModal userData = { userData } marketplaceData = { marketplaceData }/>
                                            </div>
                                            <Divider/>    
                                        </div>                        
                                        :
                                        ""
                                        }

                                        { marketplaceData.marketplaceReviews.length >= 1 ?
                                            marketplaceData.marketplaceReviews.map((review) => {
                                                return (
                                                    <MarketplaceReview targetReview = { review } marketplaceData = { marketplaceData } /> 
                                                )
                                            })
                                            :
                                            ""
                                        }
                                    </div>
                                }
                    </div>}
                    <Footer/>
                </div>
                )
        }
        
        
        else
        {
            return (
                <NotLoggedUser/>
            )
        } 
    }
}

