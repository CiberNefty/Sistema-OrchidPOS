import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/estilosfinal.css';

export default function UnifiedSidebar({ onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    localStorage.removeItem("token");
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { to: "/inicio", icon: "🏠", text: "Inicio" },
    { to: "/ventas", icon: "🛒", text: "Punto de Venta" },
    { to: "/detalle-venta", icon: "📄", text: "Detalle Ventas" },
    { to: "/proveedores", icon: "🚚", text: "Proveedores" },
    { to: "/historial-venta", icon: "🧾", text: "Historial Ventas" },
    { to: "/historial-general", icon: "🕒", text: "Historial General" },
    { to: "/historial-producto", icon: "📋", text: "Historial Productos" },
    { to: "/productos", icon: "📦", text: "Productos" },
    { to: "/categorias", icon: "🏷️", text: "Categorías" },
    { to: "/subcategorias", icon: "📋", text: "Subcategorías" },
    { to: "/usuarios", icon: "👥", text: "Usuarios" },
    { to: "/perfil", icon: "👤", text: "Perfil" },
    { to: "/contacto", icon: "✉️", text: "Contacto" },
    { to: "/docs", icon: "📖", text: "Documentación" }
    //{ to: "/historial", icon: "📊", text: "Historial" },
    //{ to: "/ventas", icon: "🛒", text: "Ventas" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
        <h3 className="mobile-title">
          🏪 BELLA Y ACTUAL
        </h3>
        <button className="mobile-logout" onClick={handleLogout}>
          🚪
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>🏪 BELLA Y ACTUAL</h3>
              <button className="mobile-close" onClick={toggleMobileMenu}>
                ✕
              </button>
            </div>
            <div className="mobile-menu-items">
              {menuItems.map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  className="mobile-menu-item"
                  onClick={toggleMobileMenu}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              ))}
              <button className="mobile-menu-logout" onClick={handleLogout}>
                <span className="menu-icon">🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {isCollapsed ? '▶' : '◀'}
        </button>

        <div className="sidebar-header">
          <h3>
            <span className="sidebar-logo">🏪</span>
            <span>BELLA Y ACTUAL</span>
          </h3>
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({ isActive }) => 
                `menu-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
}