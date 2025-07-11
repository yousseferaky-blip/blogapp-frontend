import axios from "axios";
import { BASE_URL } from "./url";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const getPostDetails = async ({id,setPost}) =>{
        try{
            const res = await axios.get(`${BASE_URL}/post/${id}`,{ withCredentials: true });
            setPost(res.data.post)
        }catch(err){
            console.log(err)
        }
}

export  const deletePost = async ({id,navigate}) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف البوست بشكل دائم!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف البوست",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/post/${id}`, { withCredentials: true });
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف البوست بنجاح.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
        Swal.fire("خطأ!", "حدث خطأ أثناء الحذف.", "error");
      }
    }
};

export const CreateNewPost = async ({ e, title, desc, username, userId, file, navigate }) =>{
      e.preventDefault()

        const post = {
            title,
            desc,
            username,
            userId,
        }
        const data = new FormData()
        data.append("photo",file)
        Object.keys(post).forEach((key) => {
            data.append(key, post[key]);
        });

        try{
            await axios.post(`${BASE_URL}/post/create`, data 
            ,{
            withCredentials:true , 
            headers :{
                "Content-Type": "multipart/form-data",
            }}
        )
            navigate("/profile")
            window.location.reload()
            toast.success("Post created successfully")
        }catch(err){
            console.log(err)
        }
}

export const getUserPosts = async ({user,setPosts}) =>{
      const res = await axios.get(`${BASE_URL}/post/user/${user._id}`,{ withCredentials: true });
      setPosts(res.data.posts)
}

export  const getPosts = async ({setPosts}) =>{
    try{
        const res = await axios.get(`${BASE_URL}/post`,{ withCredentials: true });
        setPosts(res.data.posts)
    }catch(err){
        console.log(err)
    }
}

export const handleLogout = async ({ setUser, navigate }) => {
  const result = await Swal.fire({
    title: "هل أنت متأكد؟",
    text: "سيتم تسجيل الخروج من الحساب",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "تسجيل الخروج",
    cancelButtonText: "إلغاء",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    try {
      await axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
      setUser(null);

      Swal.fire({
        title: "تم تسجيل الخروج",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      Swal.fire("خطأ!", "حدث خطأ أثناء تسجيل الخروج", "error");
    }
  }
};


export const getComment = async ({ e, setCommentsList, id }) => {
  if (e) e.preventDefault(); 
  try {
    const res = await axios.get(`${BASE_URL}/comment/post/${id}`, {
      withCredentials: true,
    });
    setCommentsList(res.data.post);
    console.log(res.data.post);
  } catch (err) {
    console.log(err);
  }
};


export const createComments = async ({ userId, author, comment, postId }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/comment/create`,
      { userId, author, comment, postId },
      { withCredentials: true }
    );
    return res; 
  } catch (err) {
    console.log(err);
  }
};

 export const deleteComment = async ({commentId, setCommentsList}) => {
  const result = await Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'سيتم حذف التعليق بشكل دائم!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'نعم، احذفه',
    cancelButtonText: 'إلغاء',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${BASE_URL}/comment/${commentId}`, { withCredentials: true });
      setCommentsList(prev => prev.filter(comment => comment._id !== commentId));
      toast.success("تم حذف التعليق");
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء حذف التعليق");
    }
  }
};

export const updateComment = async ({ commentId, comment }) => {
  return await axios.put(
    `${BASE_URL}/comment/${commentId}`,
    { comment }, 
    { withCredentials: true }
  );
};

export const handleDeleteUser = async ({navigate,user}) => {
  const result = await Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'سيتم حذف حسابك بشكل دائم!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'نعم، احذف الحساب',
    cancelButtonText: 'إلغاء'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${BASE_URL}/users/${user._id}`, { withCredentials: true });
      toast.success("تم حذف الحساب بنجاح");
      navigate('/login');
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء الحذف");
    }
  }
};

export const handleUpdateUser = async ({ userId, updatedData, setUser }) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${userId}`, updatedData, {
      withCredentials: true,
    });

    toast.success("تم تحديث البيانات بنجاح");
    setUser(res.data); // تحديث البيانات في السياق
  } catch (err) {
    console.log(err);
    toast.error("حدث خطأ أثناء التعديل");
  }
};
























