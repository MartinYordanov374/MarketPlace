const [reviewModalState, setReviewModalState] = useState(false)
export default function ReviewModal()
{
    return (
        <Modal open={reviewModalState} onClose={closeReviewModal} >
            <Fade in={reviewModalState}>
                <Box sx={ModalStyle}>
                    <Typography className='addReviewTitle' variant="h5">Share your thoughts:</Typography>
                    <TextareaAutosize 
                        className="addReviewInput" 
                        maxLength={120} 
                        value = {userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                    />
                    <Button color='warning' className='addReviewButton' onClick={() => addReview()}>Submit</Button>
                </Box>
            </Fade>
        </Modal>
    )
}