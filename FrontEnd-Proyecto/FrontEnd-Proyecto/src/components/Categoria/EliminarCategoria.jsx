import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";

const EliminarCategoria = () => {
  const { Id_Categoria } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:5000/categorias/${Id_Categoria}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setCategoria(res.data);
    })
    .catch(err => {
      console.error(err);
      setError('Error al obtener los datos de la categoria.');
    });
  }, [Id_Categoria]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:5000/categorias/${Id_Categoria}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      navigate('/categorias');
    })
    .catch(() => {
      setError('Error al eliminar la categoria.');
    });
  };

  const cancelar = () => navigate('/categorias');

  return (
    <div className="eliminar-container">
      <div className="eliminar-card">
        <h2 className="eliminar-title">Eliminar Categoria</h2>
        {error && <p className="eliminar-error">{error}</p>}
        {categoria ? (
          <>
            <p className="eliminar-text">
              ¿Estás seguro de que deseas eliminar la categoria <strong>{categoria.Nombre_Cat}</strong>?
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

export default EliminarCategoria;
