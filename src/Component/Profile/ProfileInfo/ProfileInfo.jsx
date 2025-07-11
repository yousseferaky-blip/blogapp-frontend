import { Calendar, Plus, Edit2, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './ProfileInfo.css'
import { UserContext } from '../../../context/UserContext'
import { useContext, useState } from 'react'
import { handleDeleteUser, handleUpdateUser } from '../../../assets/Functions'

const ProfileInfo = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)

  const handleSaveEdit = () => {
    handleUpdateUser({
      userId: user._id,
      updatedData: { username, email },
      setUser
    });
    setIsEditing(false);
  };

  return (
    <section className="profile-container">
      <div className="profile-container__card">
        <div className="profile-container__header">
          <div className="profile-container__avatar">
            <span className="profile-container__avatar-text">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="profile-container__info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="edit-input"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="edit-input"
                />
              </>
            ) : (
              <>
                <h1 className="profile-container__username">{user.username}</h1>
                <p className="profile-container__email">{user.email}</p>
              </>
            )}

            <div className="profile-container__meta">
              <div className="profile-container__meta-item">
                <Calendar size={16} />
                <span>{new Date(user.updatedAt).toString().slice(0, 15)}</span>
              </div>
            </div>
          </div>

          <Link to="/create-post">
            <button className="profile-container__write-btn">
              <Plus size={16} style={{ marginRight: "8px" }} />
              Write Post
            </button>
          </Link>
        </div>

        <div className="profile-container__actions">
          {isEditing ? (
            <>
              <button className="edit-user-btn" onClick={handleSaveEdit}>
                💾 حفظ التعديلات
              </button>
              <button className="delete-user-btn" onClick={() => setIsEditing(false)}>
                ❌ إلغاء
              </button>
            </>
          ) : (
            <>
              <button className="edit-user-btn" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} style={{ marginRight: "5px" }} />
                تعديل الحساب
              </button>
              <button className="delete-user-btn" onClick={() => handleDeleteUser({ user, navigate })}>
                <Trash2 size={16} style={{ marginRight: "5px" }} />
                حذف الحساب
              </button>
            </>
          )}
        </div>
        
      </div>
    </section>
  )
}

export default ProfileInfo
