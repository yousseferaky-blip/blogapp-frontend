import { Calendar } from 'lucide-react'
import  './Posts.css'
import { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../assets/url'
import { useNavigate } from 'react-router-dom'
import {  getPosts } from '../../assets/Functions'
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'

const Posts = () => {
    const {user} = useContext(UserContext)
    const [posts,setPosts] = useState([])
   const navigate = useNavigate();

  useEffect(() => {
    getPosts({ setPosts });
  }, []);

  const handleReadMore = (id) => {
    if (user) {
      navigate(`/post/${id}`)
    } else {
      Swal.fire({
        title: 'غير مسموح',
        text: 'يجب تسجيل الدخول لعرض تفاصيل البوست',
        icon: 'info',
        confirmButtonText: 'تسجيل الدخول',
      }).then(() => {
        navigate('/login');
      });
    }
  };

  return (
    <section className="latest-posts-section">
      <div className="posts-header">
        <h2 className="section-title">Latest Posts</h2>
      </div>

      <div className="posts-grid">
        {
            posts.map((post,index)=>(
                    <div key={index} className="post-card">
                        <div className="post-image">
                            <img 
                            src={`${post.photo}`} 
                            loading='lazy' 
                            alt={post.title} 
                            onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    <div className="post-header">
                            <h3 className="post-title">{post.title}</h3>
                        <div className="post-meta">
                            <div className="author">
                                <div className="avatar">{post.username.charAt(0).toUpperCase()}</div>
                                <span>{post.username}</span>
                            </div>
                            <div className="date">
                                <Calendar size={14} />
                                <span>{new Date(post.createdAt).toString().slice(0,15)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>{post.desc}</p>
                        <div className="post-footer">
                        <span className="read-time">5 min read</span>
                        <button 
                        onClick={() => handleReadMore(post._id)}                        
                        className="read-more-btn">Read More →</button>
                        </div>
                    </div>
                </div>
            ))
        }
       

      </div>
    </section>
  )
}

export default Posts