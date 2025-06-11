import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";

const EditarUsuario = () => {
  const { Id_Usuario } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/usuarios/${Id_Usuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);
      } catch (err) {
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRoles = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/roles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoles(res.data);
      } catch {
        console.error('Error al cargar roles');
      }
    };

    fetchUsuario();
    fetchRoles();
  }, [Id_Usuario, navigate]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const usuarioData = {
      ...usuario,
      Contraseña_hash: usuario.Contraseña_hash || undefined, 
    };

    try {
      await axios.put(`http://127.0.0.1:5000/usuarios/${Id_Usuario}`, usuarioData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/usuarios');
    } catch (err) {
      setError('Error al actualizar el usuario.');
    }
  };

  if (loading) return <p className="form-loading">Cargando usuario...</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!usuario) return <p className="form-error">Usuario no encontrado.</p>;

  return (
    <div className="registro-container">
      <h2 className="form-title">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="Nombre_Usu"
          value={usuario.Nombre_Usu || ''}
          onChange={handleChange}
          className="form-input"
        />
        
        <label className="form-label">Contraseña:</label>
        <input
          type="password" // Cambié a "password" para ocultar el texto
          name="Contraseña_hash"
          value={usuario.Contraseña_hash || ''}
          onChange={handleChange}
          className="form-input"
          placeholder="Dejar vacío si no se desea cambiar"
        />

        <label className="form-label">Cédula:</label>
        <input
          type="text"
          name="Cedula_Usu"
          value={usuario.Cedula_Usu || ''}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Correo:</label>
        <input
          type="email"
          name="Email_Usu"
          value={usuario.Email_Usu || ''}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Teléfono:</label>
        <input
          type="text"
          name="Telefono_Usu"
          value={usuario.Telefono_Usu || ''}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Fecha Contrato:</label>
        <input
          type="date"
          name="Fecha_Contrato_Inicio"
          value={usuario.Fecha_Contrato_Inicio || ''}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Rol:</label>
        <select
          name="rol"
          value={usuario.rol || ''}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.Id_Rol} value={rol.Id_Rol}>
              {rol.Nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="form-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
