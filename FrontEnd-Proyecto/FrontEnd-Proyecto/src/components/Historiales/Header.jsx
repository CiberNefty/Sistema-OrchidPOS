import React from 'react'
import '../../styles/estilosfinal.css'

export default function Header({ title }) {
return (
<div className="header">
<h2>{title}</h2>
<div className="user-info">
<div className="user-avatar">AD</div>
<span>Administrador</span>
<i className="fas fa-chevron-down"></i>
</div>
</div>
)
}