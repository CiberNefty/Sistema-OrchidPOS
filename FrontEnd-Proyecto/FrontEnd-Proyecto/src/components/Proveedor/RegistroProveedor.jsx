import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/Proveedor/RegistroProveedor.css";

const RegistroProveedor = () => {
  const navigate = useNavigate();
  const [Nombre_Prov, setNombre_Prov] = useState('');
  const [Telefono_Prov, setTelefono_Prov] = useState('');
  const [Direccion_Prov, setDireccion_Prov] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!Nombre_Prov || !Telefono_Prov || !Direccion_Prov) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://127.0.0.1:5000/proveedores', {
        Nombre_Prov,
        Telefono_Prov,
        Direccion_Prov,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Proveedor agregado:', response.data);
      navigate('/proveedores')
      setNombre_Prov('');
      setTelefono_Prov('');
      setDireccion_Prov('');
    } catch (error) {
      console.error('Error al registrar el proveedor', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.');
        } else if (error.response.status === 401) {
          setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          navigate('/');
        } else {
          setError('Error al registrar el proveedor. Intenta nuevamente más tarde.');
        }
      } else {
        setError('Error de conexión. Por favor, intenta nuevamente más tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="REGISTRO DE PROVEEDOR">
      <div className="registro-container">
        <h2>Registro de Proveedor</h2>
        {error && <p className="error">{error}</p>}
        {isLoading && <p>Cargando...</p>}
        <form onSubmit={manejarEnvio}>
          <div>
            <label>Nombre del Proveedor:</label>
            <input
              type="text"
              value={Nombre_Prov}
              onChange={(e) => setNombre_Prov(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Teléfono del Proveedor:</label>
            <input
              type="text"
              value={Telefono_Prov}
              onChange={(e) => setTelefono_Prov(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Dirección del Proveedor:</label>
            <input
              type="text"
              value={Direccion_Prov}
              onChange={(e) => setDireccion_Prov(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </AppLayout>
  );
};

export default RegistroProveedor;