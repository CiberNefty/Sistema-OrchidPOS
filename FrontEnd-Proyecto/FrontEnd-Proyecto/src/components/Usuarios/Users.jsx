import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Usuarios recibidos:", response.data); // revisa esto en la consola
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <div className="tabla-contenedor">
      <div className="boton-contenedor">
        <button className="boton-registro" onClick={() => navigate('/registro-usuario')}>
          <PersonAddAltIcon />
        </button>
      </div>
      <h2>Lista de Usuarios</h2>
      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha Contrato</th>
              <th>Rol</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.Id_Usuario}>
                <td>{usuario.Id_Usuario}</td>
                <td>{usuario.Nombre_Usu}</td>
                <td>{usuario.Cedula_Usu}</td>
                <td>{usuario.Email_Usu}</td>
                <td>{usuario.Telefono_Usu}</td>
                <td>{usuario.Fecha_Contrato_Inicio}</td>
                <td>{usuario.rol_rl.Nombre}</td>
                <td>
                  <button onClick={() => navigate(`/editar-usuario/${usuario.Id_Usuario}`)}>
                      <EditIcon/>
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/eliminar-usuario/${usuario.Id_Usuario}`)}>
                      <DeleteIcon/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuarios;
