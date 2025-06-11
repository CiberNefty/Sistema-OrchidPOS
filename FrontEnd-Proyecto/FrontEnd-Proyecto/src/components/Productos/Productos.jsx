import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'success', 'error', 'info'
  
  const navigate = useNavigate();
  const location = useLocation();

  const cargarProductos = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoading(false);
      navigate('/');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get('http://127.0.0.1:5000/productos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("Productos recibidos:", response.data);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setProductos([]);
      
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        mostrarMensaje('Error al cargar los productos', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Función para mostrar mensajes
  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      setMensaje('');
      setTipoMensaje('');
    }, 5000);
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, [navigate]);

  // Manejar refresh y mensajes desde otras páginas
  useEffect(() => {
    if (location.state?.refresh) {
      console.log('Refrescando lista de productos...');
      cargarProductos();
    }
    
    if (location.state?.message) {
      mostrarMensaje(location.state.message, 'success');
    }
    
    // Limpiar el estado para evitar re-renders
    if (location.state) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRefresh = () => {
    mostrarMensaje('Actualizando lista de productos...', 'info');
    cargarProductos();
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(precio);
  };

  const formatearPorcentaje = (valor) => {
    return `${(valor * 100).toFixed(1)}%`;
  };

  const getEstadoClase = (estado) => {
    return estado ? 'activo' : 'inactivo';
  };

  const getEstadoTexto = (estado) => {
    return estado ? 'Activo' : 'Inactivo';
  };

  return (
    <AppLayout title="GESTIÓN DE PRODUCTOS">
      {/* Mensajes de estado */}
      {mensaje && (
        <div 
          className={`mensaje mensaje-${tipoMensaje}`}
          style={{
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '16px',
            border: '1px solid',
            ...(tipoMensaje === 'success' && {
              color: '#2e7d32',
              backgroundColor: '#e8f5e8',
              borderColor: '#c8e6c9'
            }),
            ...(tipoMensaje === 'error' && {
              color: '#d32f2f',
              backgroundColor: '#ffebee',
              borderColor: '#ffcdd2'
            }),
            ...(tipoMensaje === 'info' && {
              color: '#1976d2',
              backgroundColor: '#e3f2fd',
              borderColor: '#bbdefb'
            })
          }}
        >
          {tipoMensaje === 'success' && '✅ '}
          {tipoMensaje === 'error' && '⚠️ '}
          {tipoMensaje === 'info' && 'ℹ️ '}
          {mensaje}
          <button 
            onClick={() => setMensaje('')}
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '0 5px'
            }}
          >
            ×
          </button>
        </div>
      )}

      <div className="boton-contenedor">
        <button 
          className="boton-registro" 
          onClick={() => navigate('/registro-producto')}
          disabled={isLoading}
        >
          <AddIcon /> Agregar Producto
        </button>
        
        <button 
          className="boton-registro" 
          onClick={handleRefresh}
          disabled={isLoading}
          style={{ marginLeft: '10px' }}
        >
          🔄 {isLoading ? 'Cargando...' : 'Refrescar'}
        </button>
      </div>

      <div className="tabla-container">
        <h3>
          Lista de Productos 
          <span style={{ color: '#666', fontWeight: 'normal' }}>
            ({productos.length} producto{productos.length !== 1 ? 's' : ''})
          </span>
        </h3>
        
        {isLoading ? (
          <div className="cargando" style={{ textAlign: 'center', padding: '40px' }}>
            <p>⏳ Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="sin-productos" style={{ textAlign: 'center', padding: '40px' }}>
            <p>📦 No hay productos registrados.</p>
            <button 
              className="boton-registro"
              onClick={() => navigate('/registro-producto')}
              style={{ marginTop: '20px' }}
            >
              <AddIcon /> Registrar primer producto
            </button>
          </div>
        ) : (
          <div className="tabla-responsive">
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Medida</th>
                  <th>Unidad</th>
                  <th>Precio Neto</th>
                  <th>IVA</th>
                  <th>Ganancia</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th>Marca</th>
                  <th>Proveedor</th>
                  <th>Subcategoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.Id_Producto}>
                    <td>{producto.Id_Producto}</td>
                    <td>
                      <strong>{producto.Nombre_Prod}</strong>
                    </td>
                    <td>{producto.Medida_Prod || 'N/A'}</td>
                    <td>{producto.Unidad_Medida_Prod}</td>
                    <td>
                      <strong>{formatearPrecio(producto.Precio_Neto_Unidad_Prod)}</strong>
                    </td>
                    <td>{formatearPorcentaje(producto.Iva_Prod)}</td>
                    <td>{formatearPorcentaje(producto.Porcentaje_Ganancia)}</td>
                    <td>
                      <span className={producto.Unidades_Totales_Prod <= 5 ? 'stock-bajo' : 'stock-normal'}>
                        {producto.Unidades_Totales_Prod}
                      </span>
                    </td>
                    <td>
                      <span className={`estado ${getEstadoClase(producto.Estado_Prod)}`}>
                        {getEstadoTexto(producto.Estado_Prod)}
                      </span>
                    </td>
                    <td>{producto.Marca_Prod || 'N/A'}</td>
                    <td>{producto.proveedor?.Nombre_Prov || 'Sin proveedor'}</td>
                    <td>{producto.subcategoria?.Nombre_Subcategoria || 'Sin categoría'}</td>
                    <td>
                      <div className="acciones-container" style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          className="btn btn-primary"
                          onClick={() => navigate(`/editar-producto/${producto.Id_Producto}`)}
                          title="Editar producto"
                          style={{ padding: '5px 8px' }}
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => navigate(`/eliminar-producto/${producto.Id_Producto}`)}
                          title="Eliminar producto"
                          style={{ padding: '5px 8px' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .tabla-responsive {
          overflow-x: auto;
        }
        
        .stock-bajo {
          color: #f44336;
          font-weight: bold;
        }
        
        .stock-normal {
          color: #4caf50;
        }
        
        .estado.activo {
          color: #4caf50;
          background-color: #e8f5e8;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.85em;
        }
        
        .estado.inactivo {
          color: #f44336;
          background-color: #ffebee;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.85em;
        }
        
        .acciones-container button {
          min-width: 35px;
        }
        
        .btn-primary {
          background-color: #2196f3;
          border-color: #2196f3;
        }
        
        .btn-danger {
          background-color: #f44336;
          border-color: #f44336;
        }
        
        .btn-primary:hover {
          background-color: #1976d2;
        }
        
        .btn-danger:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </AppLayout>
  );
};

export default Productos;