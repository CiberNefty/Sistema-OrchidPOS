import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Perfil.css'
const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No estás autenticado');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUser(response.data);
        console.log(user);
      })
      .catch(error => {
        console.error('Error al obtener el perfil', error);
        if (error.response && error.response.status === 401) {
          console.log('Token inválido. Por favor, inicia sesión nuevamente.');
          navigate('/');
        } else {
          console.log('Error al obtener el perfil. Intenta nuevamente más tarde.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
  <div className="container">
      <div className="profile-wrapper">
      {isLoading ? (
        <p>Cargando...</p>
      ) : user ? (
        <div className="profile-card">
          <h1>Perfil</h1>
          <p>Nombres: {user.Nombre_Usu}</p>
          <p>Apellidos: {user.Cedula_Usu}</p>
          <p>Correo: {user.Email_Usu}</p>
          <p>Teléfono: {user.Telefono_Usu}</p>
          <p>Dirección: {user.Fecha_Contrato_Inicio}</p>
          <p>Rol: {user.rol_rl.Nombre}</p>
        </div>
    ) : (
      <p>No se encontró información del usuario.</p>
    )}
    </div>
</div>
  );
};

export default Profile;
