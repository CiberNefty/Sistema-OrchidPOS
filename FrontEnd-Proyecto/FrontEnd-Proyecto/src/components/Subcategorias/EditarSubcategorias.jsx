import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";

const EditarSubcategoria = () => {
    const { Id_Subcategoria } = useParams();
    const navigate = useNavigate();

    const [subcategoria, setSubcategoria] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/');
            return;
        }

        const fetchSubcategoria = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/subcategorias/${Id_Subcategoria}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSubcategoria(res.data);
            } catch (err) {
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategorias = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/categorias', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategorias(res.data);
            } catch {
                console.error('Error al cargar categorias.');
            }
        };

        fetchSubcategoria();
        fetchCategorias();
    }, [Id_Subcategoria, navigate]);

    const handleChange = (e) => {
        setSubcategoria({
            ...subcategoria,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `http://127.0.0.1:5000/subcategorias/${Id_Subcategoria}`,
                {
                    Nombre_Subcategoria: subcategoria.Nombre_Subcategoria,
                    Descripcion_Subcategoria: subcategoria.Descripcion_Subcategoria,
                    Id_Categoria: subcategoria.categoria,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate('/subcategorias');
        } catch (err) {
            console.error(err);
            setError('Error al actualizar la subcategoría.');
        }
    };

    if (loading) return (
        <AppLayout title="EDITAR SUBCATEGORÍA">
            <p className='form-loading'>Cargando Subcategorías...</p>
        </AppLayout>
    );
    
    if (error) return (
        <AppLayout title="EDITAR SUBCATEGORÍA">
            <p className="form-error">{error}</p>
        </AppLayout>
    );
    
    if (!subcategoria) return (
        <AppLayout title="EDITAR SUBCATEGORÍA">
            <p className="form-error">Subcategoría no encontrada.</p>
        </AppLayout>
    );

    return (
        <AppLayout title="EDITAR SUBCATEGORÍA">
            <div className="registro-container">
                <h2 className="form-title">Editar Subcategoría</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label className="form-label">Nombre Subcategoría:</label>
                    <input
                        type="text"
                        name="Nombre_Subcategoria"
                        value={subcategoria.Nombre_Subcategoria || ''}
                        onChange={handleChange}
                        className="form-input"
                    />

                    <label className="form-label">Descripción:</label>
                    <input
                        type="text"
                        name="Descripcion_Subcategoria"
                        value={subcategoria.Descripcion_Subcategoria || ''}
                        onChange={handleChange}
                        className="form-input"
                    />

                    <label className="form-label">Categoría:</label>
                    <select
                        name="categoria"
                        value={subcategoria.categoria || ''}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="">Seleccione una Categoría</option>
                        {categorias.map((categori) => (
                            <option key={categori.Id_Categoria} value={categori.Id_Categoria}>
                                {categori.Nombre_Cat}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="form-button">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EditarSubcategoria;