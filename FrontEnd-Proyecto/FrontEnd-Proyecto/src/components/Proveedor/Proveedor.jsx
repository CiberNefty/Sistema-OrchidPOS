import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/Proveedor/Proveedor.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    setIsLoading(true);

    axios.get('http://127.0.0.1:5000/proveedores', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Proveedores Recibidos:", response.data);
        setProveedores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los proveedores', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <AppLayout title="GESTIÓN DE PROVEEDORES">
      <div className="boton-contenedor">
        <button 
          className="boton-registro" 
          onClick={() => navigate('/registro-proveedor')}
        >
          <AddIcon /> Agregar Proveedor
        </button>
      </div>

      {isLoading ? (
        <div className="tabla-container">
          <p>Cargando Proveedores...</p>
        </div>
      ) : (
        <div className="tabla-container">
          <h3>Lista de Proveedores</h3>
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Proveedor</th>
                <th>Teléfono Proveedor</th>
                <th>Dirección Proveedor</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.Id_Proveedor}>
                  <td>{proveedor.Id_Proveedor}</td>
                  <td>{proveedor.Nombre_Prov}</td>
                  <td>{proveedor.Telefono_Prov}</td>
                  <td>{proveedor.Direccion_Prov}</td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/editar-proveedor/${proveedor.Id_Proveedor}`)}
                    >
                      <EditIcon/>
                    </button>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/eliminar-proveedor/${proveedor.Id_Proveedor}`)}
                    >
                      <DeleteIcon/>
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

export default Proveedores;