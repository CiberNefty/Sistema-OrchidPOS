import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";

const EliminarProducto = () => {
    const { Id_Producto } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setError('No hay token de autenticación');
            return;
        }

        axios.get(`http://127.0.0.1:5000/productos/${Id_Producto}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            console.log('Producto obtenido:', res.data);
            setProducto(res.data);
        })
        .catch(err => {
            console.error('Error al obtener producto:', err);
            setError('Error al obtener los datos del producto.');
        });
    }, [Id_Producto]);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setError('No hay token de autenticación');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.delete(`http://127.0.0.1:5000/productos/${Id_Producto}`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Respuesta del servidor:', response.status, response.data);
            
            // ✅ Verificar que la eliminación fue exitosa
            if (response.status === 204 || response.status === 200) {
                console.log('Producto eliminado exitosamente');
                
                // ✅ Mostrar mensaje de éxito antes de redirigir
                alert('Producto eliminado exitosamente');
                
                // ✅ Redirigir inmediatamente después del mensaje
                navigate('/productos', { 
                    replace: true,
                    state: { refresh: true } // ✅ Señal para refrescar la lista
                });
            } else {
                setError('Respuesta inesperada del servidor');
            }
            
        } catch (err) {
            console.error('Error completo:', err);
            
            if (err.response) {
                console.error('Error del servidor:', err.response.status, err.response.data);
                setError(`Error del servidor: ${err.response.data?.error || err.response.data?.message || 'Error desconocido'}`);
            } else if (err.request) {
                console.error('No se recibió respuesta del servidor');
                setError('No se pudo conectar con el servidor');
            } else {
                console.error('Error en la petición:', err.message);
                setError('Error al configurar la petición');
            }
        } finally {
            setLoading(false);
        }
    };

    const cancelar = () => navigate('/productos');

    return (
        <div className="eliminar-container">
            <div className="eliminar-card">
                <h2 className="eliminar-title">Eliminar Producto</h2>
                
                {error && <p className="eliminar-error">{error}</p>}
                
                {producto ? (
                    <>
                        <p className="eliminar-text">
                            ¿Estás seguro de que deseas eliminar el producto <strong>{producto.Nombre_Prod}</strong>?
                        </p>
                        <div className="eliminar-info">
                            <p><strong>ID:</strong> {producto.Id_Producto}</p>
                            <p><strong>Marca:</strong> {producto.Marca_Prod}</p>
                            <p><strong>Unidades:</strong> {producto.Unidades_Totales_Prod}</p>
                            <p><strong>Precio:</strong> ${producto.Precio_Neto_Unidad_Prod}</p>
                        </div>
                        <div className="eliminar-botones">
                            <button 
                                className="eliminar-btn confirmar" 
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? 'Eliminando...' : 'Sí, eliminar'}
                            </button>
                            <button 
                                className="eliminar-btn cancelar" 
                                onClick={cancelar}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="eliminar-text">Cargando Producto...</p>
                )}
            </div>
        </div>
    );
};

export default EliminarProducto;