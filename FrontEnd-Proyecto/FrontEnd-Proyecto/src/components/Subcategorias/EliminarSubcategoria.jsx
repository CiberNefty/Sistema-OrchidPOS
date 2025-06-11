import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";

const EliminarSubcategoria = () => {
    const { Id_Subcategoria } = useParams();
    const navigate = useNavigate();
    const [subcategoria, setSubcategoria] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:5000/subcategorias/${Id_Subcategoria}`, {
            headers: { Authorization: `Bearer ${token}` }
            
        })
        .then(res => {
            setSubcategoria(res.data);
        })
        .catch(err => {
            console.error(err);
            setError('Error al obtener los datos.')
        });
    }, [Id_Subcategoria]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:5000/subcategorias/${Id_Subcategoria}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            navigate('/subcategorias');
        })
        .catch(() => {
            setError('Error al eliminar la subcategoria.')
        });
    };

    const cancelar = () => navigate('/subcategorias');

    return (
        <div className="eliminar-container">
          <div className="eliminar-card">
            <h2 className="eliminar-title">Eliminar Subcategoria</h2>
            {error && <p className="eliminar-error">{error}</p>}
            {subcategoria ? (
              <>
                <p className="eliminar-text">
                  ¿Estás seguro de que deseas eliminar la subcategoria <strong>{subcategoria.Nombre_Subcategoria}</strong>?
                </p>
                <div className="eliminar-botones">
                  <button className="eliminar-btn confirmar" onClick={handleDelete}>Sí, eliminar</button>
                  <button className="eliminar-btn cancelar" onClick={cancelar}>Cancelar</button>
                </div>
              </>
            ) : (
              <p className="eliminar-text">Cargando Subcategoria...</p>
            )}
          </div>
        </div>
    );
}

export default EliminarSubcategoria;