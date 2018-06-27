import React from 'react'
import './Loader.css'

const Loader = () => (
  <svg className="spinner" viewBox="0 0 100 100">
    <circle className="path" cx="50" cy="50" r="40" fill="none" stroke-width="10"></circle>
  </svg>
)

export default Loader
