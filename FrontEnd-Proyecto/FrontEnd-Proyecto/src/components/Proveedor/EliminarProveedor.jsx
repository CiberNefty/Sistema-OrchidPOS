import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/Proveedor/EliminarProveedor.css";


const EliminarProveedor = () => {
    const { Id_Proveedor } = useParams();
    const navigate = useNavigate();
    const [proveedor, setProveedor] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:5000/proveedores/${Id_Proveedor}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setProveedor(res.data);
        })
        .catch(err => {
            console.error(err)
            setError('Error al obtener los datos de proveedor')
        });
    }, [Id_Proveedor]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:5000/proveedores/${Id_Proveedor}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(() => {
            navigate('/proveedores');
        })
        .catch(() => {
            setError('Error al eliminar Proveedor.')
        });
    };

    const cancelar = () => navigate('/proveedores');

    return (
        <div className="eliminar-container">
          <div className="eliminar-card">
            <h2 className="eliminar-title">Eliminar Proveedor</h2>
            {error && <p className="eliminar-error">{error}</p>}
            {proveedor ? (
              <>
                <p className="eliminar-text">
                  ¿Estás seguro de que deseas eliminar la categoria <strong>{proveedor.Nombre_Prov}</strong>?
                </p>
                <div className="eliminar-botones">
                  <button className="eliminar-btn confirmar" onClick={handleDelete}>Sí, eliminar</button>
                  <button className="eliminar-btn cancelar" onClick={cancelar}>Cancelar</button>
                </div>
              </>
            ) : (
              <p className="eliminar-text">Cargando categorias...</p>
            )}
          </div>
        </div>
    );
};

export default EliminarProveedor;