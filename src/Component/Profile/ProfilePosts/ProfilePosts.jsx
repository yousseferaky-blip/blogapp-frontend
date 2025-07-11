import { Link, useNavigate, useParams } from 'react-router-dom';
import './ProfilePosts.css'
import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../../assets/url';
import { UserContext } from '../../../context/UserContext';
import { deletePost, getUserPosts } from '../../../assets/Functions';


const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(UserContext);
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    getUserPosts({user,setPosts})
  },[])
  
  return (
    <div className="your-posts-container">
      <div className="posts-header">
        <h2>Your Posts</h2>
        <span className="post-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
      </div>

      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post, index ) => (
            <div key={index} className="post-card">
              
               <div className="post-image">
                <img
                  src={`${BASE_URL}/images/${post.photo}`}
                  alt={post.title}
                  loading="lazy"
                />
              </div>
              <h3 className="post-title">{post.title}</h3>
              <div className="post-meta">
                <span>{new Date(post.createdAt).toString().slice(0,15)}</span>
              </div>
              <p className="post-preview">{user.username}</p>
              <p className="post-preview">{post.username}</p>
              <p className="post-preview">{post.desc}</p>
              <div className="post-actions">
                <Link to={`/post/${post._id}`} className="read-more">Read More →</Link>
                <div className="icons">
                  <button onClick={()=>deletePost({id,navigate})} className="delete-btn">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-posts">
          <div className="icon">📚</div>
          <h3>No posts yet</h3>
          <p>Start sharing your thoughts with the world!</p>
          <Link to="/create-post" className="write-btn">Write Your First Post</Link>
        </div>
      )}
    </div>
  );
};
export default ProfilePosts