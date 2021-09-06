import { useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({ asin }) => {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getComments = async () => {
            setIsLoading(true)
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFlNGYyYTA2MTBjYjAwMTVkYTJhOGYiLCJpYXQiOjE2MzA0MTc4MDcsImV4cCI6MTYzMTYyNzQwN30.Dh6ItIr-GyHW8zOAxtALq3iJbt27r6NI5h-DnolDXJk'
                    }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    setComments(comments)
                    setIsLoading(false)
                    setIsError(false)
                } else {
                    console.log('error')
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            }
        }
        getComments()
    }, [asin])

    return (
        <div>
            {isLoading && <Loading />}
            {isError && <Error />}
            <AddComment asin={asin} />
            <CommentList commentsToShow={comments} />
        </div>
    )
}

export default CommentArea