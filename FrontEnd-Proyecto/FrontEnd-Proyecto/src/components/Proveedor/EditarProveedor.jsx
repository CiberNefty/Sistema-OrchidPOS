import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
//import "../../styles/estilosfinal.css"
import "../../styles/Proveedor/EditarProveedor.css"

const EditarProveedor = () => {
    const { Id_Proveedor } = useParams();
    const navigate = useNavigate();

    const [proveedor, setProveedor] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/');
            return;
        }

        const fetchProveedor = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/proveedores/${Id_Proveedor}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProveedor(res.data);
            } catch (err) {
                setError('Error al cargar los datos del proveedor.');
            } finally {
                setLoading(false);
            }
        };

        fetchProveedor();
    }, [Id_Proveedor, navigate]);

    const handleChange = (e) => {
        setProveedor({
            ...proveedor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!proveedor) return;

        try {
            await axios.put(`http://127.0.0.1:5000/proveedores/${Id_Proveedor}`, proveedor, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/proveedores');
        } catch (err) {
            console.error(err);
            setError('Error al actualizar el proveedor.');
        }
    };

    if (loading) return (
        <AppLayout title="EDITAR PROVEEDOR">
            <p className='form-loading'>Cargando Proveedor...</p>
        </AppLayout>
    );
    
    if (error) return (
        <AppLayout title="EDITAR PROVEEDOR">
            <p className='form-error'>{error}</p>
        </AppLayout>
    );
    
    if (!proveedor) return (
        <AppLayout title="EDITAR PROVEEDOR">
            <p className='form-error'>Proveedor no encontrado.</p>
        </AppLayout>
    );

    return (
        <AppLayout title="EDITAR PROVEEDOR">
            <div className="registro-container">
                <h2 className="form-title">Editar Proveedor</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label className="form-label">Nombre Proveedor:</label>
                    <input
                        type="text"
                        name="Nombre_Prov"
                        value={proveedor.Nombre_Prov || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                    
                    <label className="form-label">Teléfono:</label>
                    <input
                        type="text"
                        name="Telefono_Prov"
                        value={proveedor.Telefono_Prov || ''}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Dejar vacío si no se desea cambiar"
                    />
                    
                    <label className="form-label">Dirección:</label>
                    <input
                        type="text"
                        name="Direccion_Prov"
                        value={proveedor.Direccion_Prov || ''}
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
export default EditarProveedor;