import React, { useState, useEffect } from 'react';
import '../../styles/Historiales/historial_productos.css';
import AppLayout from './AppLayout';
import axios from 'axios';

export default function HistorialProducto() {
    const [historial, setHistorial] = useState([]);
    const [filtros, setFiltros] = useState({
        fecha_inicio: '',
        fecha_fin: '',
        producto_id: '',
        usuario_id: '',
        tipo_movimiento: ''
    });
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos iniciales
    useEffect(() => {
        cargarHistorial();
        cargarUsuarios();
    }, []);

    const cargarHistorial = async () => {
        setLoading(true);
        setError('');
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No hay token de autenticación');
                return;
            }

            // Construir parámetros de consulta
            const params = new URLSearchParams();
            if (filtros.fecha_inicio) params.append('fecha_inicio', filtros.fecha_inicio);
            if (filtros.fecha_fin) params.append('fecha_fin', filtros.fecha_fin);
            if (filtros.producto_id) params.append('producto_id', filtros.producto_id);
            if (filtros.usuario_id) params.append('usuario_id', filtros.usuario_id);
            if (filtros.tipo_movimiento) params.append('tipo_movimiento', filtros.tipo_movimiento);

            const url = `http://127.0.0.1:5000/historial-productos${params.toString() ? '?' + params.toString() : ''}`;
            
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Historial cargado:', response.data);
            setHistorial(response.data || []);
            
        } catch (err) {
            console.error('Error cargando historial:', err);
            setError('Error al cargar el historial de productos');
        } finally {
            setLoading(false);
        }
    };

    const cargarUsuarios = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://127.0.0.1:5000/usuarios', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsuarios(response.data || []);
        } catch (err) {
            console.error('Error cargando usuarios:', err);
        }
    };

    const manejarCambioFiltro = (campo, valor) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    const aplicarFiltros = () => {
        cargarHistorial();
    };

    const limpiarFiltros = () => {
        setFiltros({
            fecha_inicio: '',
            fecha_fin: '',
            producto_id: '',
            usuario_id: '',
            tipo_movimiento: ''
        });
        // Recargar sin filtros
        setTimeout(() => cargarHistorial(), 100);
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return '-';
        return new Date(fecha).toLocaleString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const obtenerColorTipoMovimiento = (tipo) => {
        switch(tipo) {
            case 'ENTRADA': return '#28a745';
            case 'SALIDA': return '#dc3545';
            case 'MODIFICACION': return '#ffc107';
            case 'ELIMINACION': return '#6c757d';
            default: return '#17a2b8';
        }
    };

    return (
        <AppLayout title="HISTORIAL PRODUCTOS">
            {/* Filtros */}
            <div className="filtros">
                <div>
                    <label htmlFor="fecha-desde">Desde:</label>
                    <input 
                        type="date" 
                        id="fecha-desde" 
                        value={filtros.fecha_inicio}
                        onChange={(e) => manejarCambioFiltro('fecha_inicio', e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="fecha-hasta">Hasta:</label>
                    <input 
                        type="date" 
                        id="fecha-hasta" 
                        value={filtros.fecha_fin}
                        onChange={(e) => manejarCambioFiltro('fecha_fin', e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="id-producto"># Producto:</label>
                    <input 
                        type="number" 
                        id="id-producto" 
                        placeholder="ID Producto"
                        value={filtros.producto_id}
                        onChange={(e) => manejarCambioFiltro('producto_id', e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="usuario">Usuario:</label>
                    <select 
                        id="usuario" 
                        value={filtros.usuario_id}
                        onChange={(e) => manejarCambioFiltro('usuario_id', e.target.value)}
                    >
                        <option value="">Todos</option>
                        {usuarios.map(usuario => (
                            <option key={usuario.Id_Usuario} value={usuario.Id_Usuario}>
                                {usuario.Nombre_Usu}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="tipo-cambio">Tipo de Movimiento:</label>
                    <select 
                        id="tipo-cambio" 
                        value={filtros.tipo_movimiento}
                        onChange={(e) => manejarCambioFiltro('tipo_movimiento', e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="ENTRADA">Entrada</option>
                        <option value="SALIDA">Salida</option>
                        <option value="MODIFICACION">Modificación</option>
                        <option value="ELIMINACION">Eliminación</option>
                    </select>
                </div>

                <div className="filtros-botones">
                    <button onClick={aplicarFiltros} disabled={loading}>
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                    <button onClick={limpiarFiltros} disabled={loading}>
                        Limpiar
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {/* Tabla */}
            <div className="tabla-container">
                {loading ? (
                    <div className="loading-message">
                        Cargando historial...
                    </div>
                ) : (
                    <table className="tabla-historial">
                        <thead>
                            <tr>
                                <th># Movimiento</th>
                                <th>Fecha</th>
                                <th>Usuario</th>
                                <th>Producto ID</th>
                                <th>Producto</th>
                                <th>Tipo Movimiento</th>
                                <th>Cantidad</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>
                                        No hay registros de historial
                                    </td>
                                </tr>
                            ) : (
                                historial.map((movimiento) => (
                                    <tr key={movimiento.Id_Movimiento_Prod}>
                                        <td>{movimiento.Id_Movimiento_Prod}</td>
                                        <td>{formatearFecha(movimiento.Fecha_Movimiento_Prod)}</td>
                                        <td>
                                            {movimiento.usuario_HP ? 
                                                movimiento.usuario_HP.Nombre_Usu : 
                                                'Usuario desconocido'
                                            }
                                        </td>
                                        <td>{movimiento.FK_Id_Producto_HP}</td>
                                        <td>{movimiento.Producto || '-'}</td>
                                        <td>
                                            <span 
                                                style={{
                                                    backgroundColor: obtenerColorTipoMovimiento(movimiento.Tipo_Movimiento),
                                                    color: 'white',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {movimiento.Tipo_Movimiento}
                                            </span>
                                        </td>
                                        <td>{movimiento.Cantidad_Prod || 0}</td>
                                        <td>{movimiento.Descripcion_Movimiento || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Resumen */}
            {historial.length > 0 && (
                <div className="historial-resumen">
                    <p><strong>Total de registros:</strong> {historial.length}</p>
                </div>
            )}
        </AppLayout>
    );
}