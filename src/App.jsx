import './App.css'
import {Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import CreatePost from './Pages/CreatePost/CreatePost'
import PostDetail from './Pages/PostDetail/PostDetail'
import ProtectedRoute from './Layout/ProtectedRoute'
import Page404 from './assets/Page404/Page404'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />

        </Route>
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
