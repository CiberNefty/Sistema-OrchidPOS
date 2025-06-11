import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Subcategoria = () => {
    const [subcategorias, setSubcategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            navigate('/')
            return;
        }

        setIsLoading(true);
        
        axios.get('http://127.0.0.1:5000/subcategorias', {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => {
            console.log("Subcategorias recibidas:", response.data);
            setSubcategorias(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las subcategorias', error);
            if (error.response && error.response.status === 401) {
                navigate('/');
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [navigate]);

    return (
        <AppLayout title="GESTIÓN DE SUBCATEGORÍAS">
            <div className="boton-contenedor">
                <button 
                    className="boton-registro" 
                    onClick={() => navigate('/registro-subcategoria')}
                >
                    <AddIcon /> Agregar Subcategoría
                </button>
            </div>

            {isLoading ? (
                <div className="tabla-container">
                    <p>Cargando subcategorias...</p>
                </div>
            ) : (
                <div className="tabla-container">
                    <h3>Lista de Subcategorías</h3>
                    <table className="tabla-usuarios">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Subcategoría</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategorias.map((subcategoria) => (
                                <tr key={subcategoria.Id_Subcategoria}>
                                    <td>{subcategoria.Id_Subcategoria}</td>
                                    <td>{subcategoria.Nombre_Subcategoria}</td>
                                    <td>{subcategoria.Descripcion_Subcategoria}</td>
                                    <td>{subcategoria.categoria_rl.Nombre_Cat}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/editar-subcategoria/${subcategoria.Id_Subcategoria}`)}
                                        >
                                            <EditIcon/>
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/eliminar-subcategoria/${subcategoria.Id_Subcategoria}`)}
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

export default Subcategoria;