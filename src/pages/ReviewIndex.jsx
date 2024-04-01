import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

import { loadReviews, addReview, removeReview, getActionAddReview } from '../store/actions/review.actions'
import { loadToys } from '../store/actions/toy.actions'
// import { loadUsers } from '../store/actions/user.actions'

export function ReviewIndex({loggedInUser,reviews ,toyToEdit}) {
    // const { toyId } = useParams()

    // const toys = useSelector((state) => state.toyModule.toys)
    // const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    // const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutToyId: '' })

    const dispatch = useDispatch()

    
    useEffect(() => {
        loadReviews()
        // loadToys()


        socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
            console.log('GOT from socket', review)
            dispatch(getActionAddReview(review))
        })

        return () => {
            socketService.off(SOCKET_EVENT_REVIEW_ADDED)
        }
    }, [setReviewToEdit])

    const handleChange = ev => {
        const { name, value } = ev.target
        // console.log("name:",name,"value",value);
        console.log("reviewToEdit:",reviewToEdit);
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt || !reviewToEdit.aboutToyId) return alert('All fields are required')
        try {

            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', aboutToyId: '' })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    function canRemove(review) {
        if (!loggedInUser) return false
        return review.byUser._id === loggedInUser._id || loggedInUser.isAdmin
    }


    return (
        <div className="review-index">
            <h1>Reviews and Gossip</h1>
            {reviews ? (<ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        {canRemove(review) &&
                            <button onClick={() => onRemove(review._id)}>X</button>}
                        <p>
                            About:
                            {/* <Link to={`/toy/${review.aboutToyId}`}> */}
                                {toyToEdit.name}
                            {/* </Link> */}
                        </p>
                        <h3><pre>{review.txt}</pre></h3>
                        <p>
                            {/* By:
                            <Link to={`/user/${review.byUser._id}`}>
                                {review.byUser.fullname}
                            </Link> */}
                        </p>
                    </li>
                ))}
            </ul>) : ( <div>hi</div> )
            }
            {/* {
            users && loggedInUser && */}
                <form onSubmit={onAddReview}>
                    <select
                        onChange={handleChange}
                        value={reviewToEdit.aboutToyId}
                        name="aboutToyId"
                    >
                        <option value="">Select User</option>
                        {/* {toys.map(toy => ( */}
                            <option key={toyToEdit._id} value={toyToEdit._id}>
                                {toyToEdit.name}
                            </option>
                        {/* ))} */}
                    </select>
                    <textarea
                        name="txt"
                        onChange={handleChange}
                        value={reviewToEdit.txt}
                    ></textarea>
                    <button>Add</button>
                </form>
                {/* } */}
            <hr />
        </div>
    )
}