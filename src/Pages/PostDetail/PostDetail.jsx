import './PostDetail.css'
import {  useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import {  getComment, getPostDetails } from '../../assets/Functions'
import { PostComment } from '../../Component/PostDetails/PostComment/PostComment'
import PostContent from '../../Component/PostDetails/PostContent/PostContent'

const PostDetail = () => {
    const {id} = useParams()
    const [post , setPost] = useState({})
    const [commentsList, setCommentsList] = useState([]);

    useEffect(()=>{
        getPostDetails({id , setPost})
    },[id])

    useEffect(()=>{
        getComment({ id,setCommentsList });
    },[id])





  return (
      <section className="post-detail-container">
        <div className="post-detail-card">
          <img
            src={`${post.photo}`}
            alt={post.title}
            className="post-image"
          />

          <PostContent post={post}/>
          <hr className="divider" />

          <PostComment commentsList={commentsList} setCommentsList={setCommentsList}/>

        </div>
    </section>
  )
}

export default PostDetail