import React from 'react'
import '../../styles/estilosfinal.css'

export default function AppLayout({ title, children }) {
  return (
    <div className="main-content">
      {title && (
        <div className="page-header">
          <h1>{title}</h1>
        </div>
      )}
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}