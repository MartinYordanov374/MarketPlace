import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

import {useEffect, useState} from 'react'
import Axios from 'axios'

import './profilePageStyling.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { Buffer } from 'buffer';



export default function ProfilePage()
{

    const [userData, setUserData] = useState('')

    const URL_ID = window.location.href.split('/')[4]

    useEffect(() => {
        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
            let userID = res.data.user.id
            let username = res.data.user.username
            let userDataObj = {
                username: username
            }
            Axios.post('http://localhost:3001/getUserById', {id: userID})
            .then((res) => {
                let userMarketplaces = res.data.marketplaces
                let userRating = res.data.rating
                let userReviews = res.data.reviews
                let profilePicture = res.data.profilePicture

                userDataObj.marketplaces = userMarketplaces
                userDataObj.rating = userRating
                userDataObj.reviews = userReviews
                userDataObj.profilePicture = profilePicture

                if(userID == URL_ID)
                {
                    userDataObj.isOwner = true
                }

                setUserData(userDataObj)
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const openImageUploadField = () => {
        let imgInputField = document.querySelector('.imageUploadButton')
        imgInputField.click()

        let newPFP = imgInputField.files[0]
        let formData = new FormData()
        formData.append('userID', URL_ID)
        formData.append('pfp', newPFP)

        Axios.post('http://localhost:3001/uploadProfilePicture', formData)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const openCoverUploadField = () => {
        let coverInputField = document.querySelector('.coverUpload')
        coverInputField.click()
    }
    console.log(userData)
    return (
        <div>
            <Navbar/>
                <div className="profilePageWrapper">
                    {
                        userData.isOwner 
                        ?                     
                            <div className="profileWrapper">
                                <div className="coverPictureWrapper">
                                    <LocalSeeIcon className='coverUploadButton' onClick={() => openCoverUploadField()}/>
                                    <input type="file" className="coverUpload" hidden/>
                                </div>  

                                { userData.profilePicture == undefined
                                    ? 
                                    <div className="profilePictureWrapper" onClick={() => openImageUploadField()}>
                                        <UploadFileIcon className="uploadPfpIcon"/>
                                        <input type="file" className="imageUploadButton" hidden/>
                                    </div>
                                    :
                                    <div className="profilePictureWrapper" onClick={() => openImageUploadField()}>
                                        <img className="profilePicture" 
                                            src={
                                                `data: image/jpg;base64,
                                                ${Buffer.from(userData.profilePicture.data).toString('base64')}`
                                                }/>
                                            <input type="file" className="imageUploadButton" hidden/>
                                        </div>

                                }


                                <div className="profileName">
                                    <h1>{userData.username}</h1>
                                </div>
                            </div> 
                        : 
                        <div className="profileWrapper">
                            
                            <div className="coverPictureWrapper">

                            </div>

                            { userData.profilePicture == undefined
                                ? 
                                <div className="profilePictureWrapper">
                                    
                                </div>
                                :
                                <div className="profilePictureWrapper">
                                
                                </div>
                            }


                            <div className="profileName">
                                <h1>{userData.username}</h1>
                            </div>

                        </div>
                    }
                </div>
            <Footer/>
        </div>
    )
}
