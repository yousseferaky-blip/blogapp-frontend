import React from 'react'
import { Link } from 'react-router-dom'
import './Page404.css'

const Page404 = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">← Back to Home</Link>
    </div>
  )
}

export default Page404
