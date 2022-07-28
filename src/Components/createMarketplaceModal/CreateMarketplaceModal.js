import Axios from 'axios'
import React, {useState} from 'react'


export default function CreateMarketplaceModal() {

    let [createMarketplaceModalState, setCreateMarketplaceModalState] = useState(false)
    
    const openCreateMarketplaceModal = () => {
        setCreateMarketplaceModalState(true)
    }
    
    const closeCreateMarketplaceModal = () => {
        setCreateMarketplaceModalState(false)
    }
    
    const createMarketplace = () => {
        Axios.get('http://localhost:3001/getCurrentUserSession', {withCredentials: true})
        .then((res) => {
    
            marketplaceImage = marketplaceImage.replace('C:\\fakepath\\', '')
            const userID = res.data.user.id
    
            const marketplaceFormInput = document.querySelector('.uploadImageInput');
    
    
            let formData = new FormData()
            formData.append("userID", userID)
            formData.append("marketplaceDescription", marketplaceDescription)
            formData.append("marketplaceName", marketplaceName)
            formData.append("marketplaceTags", marketplaceTags)
            formData.append("marketplaceImage", marketplaceFormInput.files[0])
            
    
            Axios.post('http://localhost:3001/createMarketplace', formData)
            .then((res) => {
                toast.success('Marketplace created successfully!')
                setTimeout(() => {
                    window.location.reload()
                },6000)
            })
            .catch((err) => {
                let errorMessage = err.response.data.msg
                toast.warn(errorMessage)
    
            })
        })
    }
    
    return(
        <div>
                <Button color="warning" sx={{ width: "94%", marginTop: 2, marginLeft: "3%" }} onClick={() => openCreateMarketplaceModal()}>
                    <strong>Add Marketplace</strong>
                </Button> 
        </div>
    )
}