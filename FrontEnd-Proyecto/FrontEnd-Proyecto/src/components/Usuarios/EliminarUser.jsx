import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";

const EliminarUsuario = () => {
  const { Id_Usuario } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:5000/usuarios/${Id_Usuario}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsuario(res.data);
    })
    .catch(err => {
      console.error(err);
      setError('Error al obtener los datos del usuario.');
    });
  }, [Id_Usuario]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:5000/usuarios/${Id_Usuario}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      navigate('/usuarios');
    })
    .catch(() => {
      setError('Error al eliminar el usuario.');
    });
  };

  const cancelar = () => navigate('/usuarios');

  return (
    <div className="eliminar-container">
      <div className="eliminar-card">
        <h2 className="eliminar-title">Eliminar Usuario</h2>
        {error && <p className="eliminar-error">{error}</p>}
        {usuario ? (
          <>
            <p className="eliminar-text">
              ¿Estás seguro de que deseas eliminar al usuario <strong>{usuario.Nombre_Usu}</strong>?
            </p>
            <div className="eliminar-botones">
              <button className="eliminar-btn confirmar" onClick={handleDelete}>Sí, eliminar</button>
              <button className="eliminar-btn cancelar" onClick={cancelar}>Cancelar</button>
            </div>
          </>
        ) : (
          <p className="eliminar-text">Cargando usuario...</p>
        )}
      </div>
    </div>
  );
};

export default EliminarUsuario;
