import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/perfil";
import UnifiedSidebar from "./components/Historiales/Sidebar";
import Inicio from "./components/Home/Inicio";
import Usuarios from "./components/Usuarios/Users";
import RegistroUsers from "./components/Usuarios/RegistroUsers";
import EditarUsuario from "./components/Usuarios/EditarUsers";
import EliminarUsuario from "./components/Usuarios/EliminarUser";
import Categorias from "./components/Categoria/Categorias";
import RegistroCategoria from "./components/Categoria/RegistroCategoria";
import EditarCategoria from "./components/Categoria/EditarCategoria";
import EliminarCategoria from "./components/Categoria/EliminarCategoria";
import Proveedores from "./components/Proveedor/Proveedor";
import RegistroProveedor from "./components/Proveedor/RegistroProveedor";
import EditarProveedor from "./components/Proveedor/EditarProveedor";
import EliminarProveedor from "./components/Proveedor/EliminarProveedor";
import Subcategoria from "./components/Subcategorias/Subcategorias";
import RegistroSubcategoria from "./components/Subcategorias/RegistroSubcategoria";
import EditarSubcategoria from "./components/Subcategorias/EditarSubcategorias";
import EliminarSubcategoria from "./components/Subcategorias/EliminarSubcategoria";
import Productos from "./components/Productos/Productos";
import RegistroProducto from "./components/Productos/RegistroProductos";
import EditarProducto from "./components/Productos/EditarProductos";
import EliminarProducto from "./components/Productos/EliminarProducto";
import SwaggerDocs from "./components/Swagger/SwaggerDocs";


// Componentes del módulo Historiales
import Contacto from './components/Historiales/Contacto'
import DetalleVenta from './components/Historiales/DetalleVenta'
import HistorialProducto from "./components/Historiales/HistorialProducto";
import HistorialVenta from "./components/Historiales/HistorialVenta";
import HistorialGeneral from "./components/Historiales/HistorialGeneral";
import Ventass from './components/Historiales/Ventas'
import Ventas from "./components/Historiales/Ventas";

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {/* Solo mostrar sidebar si NO es la página de login */}
      {!isLoginPage && <UnifiedSidebar />}
      
      <div className={`content ${!isLoginPage ? 'with-sidebar' : ''}`}>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/" element={<Login />} />
          
          {/* Rutas principales */}
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/perfil" element={<Profile />} />
          
          {/* Gestión de Usuarios */}
          <Route path="/usuarios" element={<Usuarios />}/>
          <Route path="/registro-usuario" element={<RegistroUsers />}/>
          <Route path="/editar-usuario/:Id_Usuario" element={<EditarUsuario />} />
          <Route path="/eliminar-usuario/:Id_Usuario" element={<EliminarUsuario />} />
          
          {/* Gestión de Categorías */}
          <Route path="/categorias" element={<Categorias />}/>
          <Route path="/registro-categoria" element={<RegistroCategoria />}/>
          <Route path="/editar-categoria/:Id_Categoria" element={<EditarCategoria />} />
          <Route path="/eliminar-categoria/:Id_Categoria" element={<EliminarCategoria />} />
          
          {/* Gestión de Proveedores */}
          <Route path="/proveedores" element={<Proveedores />}/>
          <Route path="/registro-proveedor" element={<RegistroProveedor />}/>
          <Route path="/editar-proveedor/:Id_Proveedor" element={<EditarProveedor />} />
          <Route path="/eliminar-proveedor/:Id_Proveedor" element={<EliminarProveedor />} />
          
          {/* Gestión de Subcategorías */}
          <Route path="/subcategorias" element={<Subcategoria />} />
          <Route path="/registro-subcategoria" element={<RegistroSubcategoria />} />
          <Route path="/editar-subcategoria/:Id_Subcategoria" element={<EditarSubcategoria />} />
          <Route path="/eliminar-subcategoria/:Id_Subcategoria" element={<EliminarSubcategoria />} />
          
          {/* Gestión de Productos */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/registro-producto" element={<RegistroProducto />} />
          <Route path="/editar-producto/:Id_Producto" element={<EditarProducto />} />
          <Route path="/eliminar-producto/:Id_Producto" element={<EliminarProducto />} />
          
          {/* Módulo de Ventas */}
          <Route path="/ventas" element={<Ventas/>} />
          
          
          
          {/* Módulo de Historiales */}
          <Route path="/historial-producto" element={<HistorialProducto />} />
          <Route path="/historial-venta" element={<HistorialVenta />} />
          <Route path="/historial-general" element={<HistorialGeneral />} />
          <Route path="/detalle-venta" element={<DetalleVenta />} />
          <Route path="/contacto" element={<Contacto />} />
          
          {/* Documentación */}
          <Route path="/docs" element={<SwaggerDocs />} />
        </Routes>
      </div>
    </>
  );
}

export default AppRoutes;

