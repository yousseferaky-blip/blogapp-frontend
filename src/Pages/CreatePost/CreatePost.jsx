import { Link, useNavigate } from 'react-router-dom'
import './CreatePost.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { CreateNewPost } from '../../assets/Functions'

const CreatePost = () => {
    const {user} = useContext(UserContext)
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [username, setUserName] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate()
   
const handleSubmit = (e) => {
  CreateNewPost({
    e,
    title,
    desc,
    username,
    userId: user._id,
    file,
    navigate,
  });
};
  return (
    <section className="create-post-container">
      <div className="create-post-wrapper">

        <div className="create-post-header">
          <Link to="/profile" className="back-button">← Back</Link>
          <div>
            <h1 className="create-title">Create New Post</h1>
            <p className="create-subtitle">Share your thoughts with the world</p>
          </div>
        </div>

        <div className="form-card">
          <h2 className="form-title">Post Details</h2>
          <form className="post-form">

            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                placeholder="Enter your post title..."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">UserName *</label>
              <input
                type="text"
                id="title"
                placeholder="Enter your post username..."
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>


            <div className="form-group">
              <label htmlFor="desc">Description *</label>
              <textarea
                id="desc"
                placeholder="Write a short description..."
                rows="4"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>


            <div className="form-group">
              <label htmlFor="photo">Upload Photo *</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>


            <div className="form-actions">
              <button onClick={handleSubmit} type="submit" className="submit-btn">Create Post</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreatePost