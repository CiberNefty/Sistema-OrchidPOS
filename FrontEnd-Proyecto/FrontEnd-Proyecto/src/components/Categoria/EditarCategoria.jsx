import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";

const EditarCategoria = () => {
  const { Id_Categoria } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const fetchCategoria = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/categorias/${Id_Categoria}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategoria(res.data);
      } catch (err) {
        setError('Error al cargar los datos de la categoria.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [Id_Categoria, navigate]);

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!categoria) return;
  
    try {
      await axios.put(`http://127.0.0.1:5000/categorias/${Id_Categoria}`, categoria, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/categorias');
    } catch (err) {
      console.error(err);
      setError('Error al actualizar la categoría.');
    }
  };

  if (loading) return (
    <AppLayout title="EDITAR CATEGORÍA">
      <p className="form-loading">Cargando categoria...</p>
    </AppLayout>
  );
  
  if (error) return (
    <AppLayout title="EDITAR CATEGORÍA">
      <p className="form-error">{error}</p>
    </AppLayout>
  );
  
  if (!categoria) return (
    <AppLayout title="EDITAR CATEGORÍA">
      <p className="form-error">Categoria no encontrada.</p>
    </AppLayout>
  );

  return (
    <AppLayout title="EDITAR CATEGORÍA">
      <div className="registro-container">
        <h2 className="form-title">Editar Categoria</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="Nombre_Cat"
            value={categoria.Nombre_Cat || ''}
            onChange={handleChange}
            className="form-input"
          />
          
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            name="Descripcion_Cat"
            value={categoria.Descripcion_Cat || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="Dejar vacío si no se desea cambiar"
          />
          <button type="submit" className="form-button">
            Guardar Cambios
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditarCategoria;