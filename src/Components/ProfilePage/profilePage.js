import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

import {useEffect, useState} from 'react'
import Axios from 'axios'

import './profilePageStyling.css'
export default function ProfilePage()
{

    const [userData, setUserData] = useState('')

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

                userDataObj.marketplaces = userMarketplaces
                userDataObj.rating = userRating
                userDataObj.reviews = userReviews

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

    return (
        <div>
            <Navbar/>
                <div className="profilePageWrapper">

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
                </div>
            <Footer/>
        </div>
    )
}
