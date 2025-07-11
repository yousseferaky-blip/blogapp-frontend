import "./PostContent.css"
import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import { deletePost } from '../../../assets/Functions'
import { useNavigate, useParams } from 'react-router-dom'

const PostContent = ({post}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const {id} = useParams()
  return (
    <>
      <div className="post-header">
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span>By <strong>{user.username}</strong></span>
                <span> | {new Date(post.createdAt).toDateString()}</span>
              </div>
              <span><strong>{post.username}</strong></span>
              {
                user._id === post.userId &&
                  <button onClick={()=>deletePost({id , navigate})} className="delete-post-btn">🗑️ Delete Post</button>
              }
            </div>
    
            <div className="post-contents">
              <p>{post.desc}</p>
            </div>
    
    </>
  )
}

export default PostContent