import './PostComment.css'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { createComments, deleteComment, updateComment } from '../../../assets/Functions';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

export const PostComment = ({ setCommentsList, commentsList }) => {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [comment, setComment] = useState("")
  const [editId, setEditId] = useState(null)
  const [editedText, setEditedText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("لا يمكن إرسال تعليق فارغ");

    try {
      const res = await createComments({
        userId: user._id,
        author: user.username,
        comment: comment,
        postId: id
      });

      setCommentsList((prev) => [...prev, res.data.comment]);
      setComment("");
      toast.success("تم إضافة التعليق");
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء الإضافة");
    }
  };

  const handleEditSave = async (commentId) => {
    if (!editedText.trim()) return toast.error("لا يمكن أن يكون التعليق فارغًا");

    try {
      const res = await updateComment({ commentId, comment: editedText });
      setCommentsList(prev =>
        prev.map(c => (c._id === commentId ? res.data.comment : c))
      );
      setEditId(null);
      toast.success("تم تعديل التعليق");
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء التعديل");
    }
  };

  return (
    <div className="comments-section">
      <h2 className="comments-title">Comments ({commentsList.length})</h2>

      <div className="add-comment">
        <input
          type="text"
          placeholder="اكتب تعليقك هنا..."
          className="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSubmit} className="add-comment-btn">إضافة</button>
      </div>

      <ul className="comment-list">
        {commentsList.map((comment, index) => (
          <li key={index} className="comment-item">
            {editId === comment._id ? (
              <>
                <input
                  className="edit-comment-input"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="comment-actions">
                  <button
                    onClick={() => handleEditSave(comment._id)}
                    className="update-comment-btn"
                  >💾 حفظ</button>
                  <button
                    onClick={() => setEditId(null)}
                    className="cancel-edit-btn"
                  >❌ إلغاء</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>{comment.author}</strong>: {comment.comment}</p>
                {comment.userId === user._id && (
                  <div className="comment-actions">
                    <button
                      onClick={() =>
                        deleteComment({
                          commentId: comment._id,
                          setCommentsList
                        })
                      }
                      className="delete-comment-btn"
                    >🗑️</button>

                    <button
                      onClick={() => {
                        setEditId(comment._id)
                        setEditedText(comment.comment)
                      }}
                      className="update-comment-btn"
                    >✏️</button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
