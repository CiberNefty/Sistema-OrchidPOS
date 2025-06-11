import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/categorias', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Categorias Recibidas:", response.data);
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <AppLayout title="GESTIÓN DE CATEGORÍAS">
      <div className="boton-contenedor">
        <button 
          className="boton-registro" 
          onClick={() => navigate('/registro-categoria')}
        >
          <AddIcon /> Agregar Categoria
        </button>
      </div>

      {isLoading ? (
        <div className="tabla-container">
          <p>Cargando Categorias...</p>
        </div>
      ) : (
        <div className="tabla-container">
          <h3>Lista de Categorías</h3>
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Categoria</th>
                <th>Descripción</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.Id_Categoria}>
                  <td>{categoria.Id_Categoria}</td>
                  <td>{categoria.Nombre_Cat}</td>
                  <td>{categoria.Descripcion_Cat}</td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/editar-categoria/${categoria.Id_Categoria}`)}
                    >
                      <EditIcon />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/eliminar-categoria/${categoria.Id_Categoria}`)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
};

export default Categorias;
