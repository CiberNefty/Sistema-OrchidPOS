import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";

const RegistroSubcategoria = () => {
    const navigate = useNavigate();
    const [Nombre_Subcategoria, setNombre_Subcategoria] = useState('');
    const [Descripcion_Subcategoria, setDescripcion_Subcategoria] = useState('');
    const [categoria, setcategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:5000/categorias', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            setCategorias(response.data);
            console.log("Categorias Recibidas: ", response.data);
        })
        .catch(error => {
            console.error('Error al obtener categorias: ', error);
        });
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        if(!Nombre_Subcategoria || !Descripcion_Subcategoria || !categoria) {
            setError('Por favor, completa todos los campos.');
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://127.0.0.1:5000/subcategorias', {
                Nombre_Subcategoria,
                Descripcion_Subcategoria,
                Id_Categoria: categoria,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Subcategoria Agregada: ', response.data);
            navigate('/subcategorias')
            setNombre_Subcategoria('');
            setDescripcion_Subcategoria('');
            setcategoria('');
        } catch (error) {
            console.error('Error al registrar la subcategoria', error);
            if (error.response) {
                if (error.response.status === 400) {
                    setError('Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.');
                } else if (error.response.status === 401) {
                    setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    navigate('/');
                } else {
                    setError('Error al registrar la subcategoria. Intenta nuevamente más tarde.');
                }
            } else {
                setError('Error de conexión. Por favor, intenta nuevamente más tarde.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout title="REGISTRO DE SUBCATEGORÍA">
            <div className="registro-container">
                <h2>Registro de Subcategoría</h2>
                {error && <p className="error">{error}</p>}
                {isLoading && <p>Cargando...</p>}
                <form onSubmit={manejarEnvio}>
                    <div>
                        <label>Nombre Subcategoría:</label>
                        <input
                            type="text"
                            value={Nombre_Subcategoria}
                            onChange={(e) => setNombre_Subcategoria(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={Descripcion_Subcategoria}
                            onChange={(e) => setDescripcion_Subcategoria(e.target.value)}
                            required
                        />
                    </div>
                    <div className="select-container"> 
                        <label className="form-label">Categoría:</label>
                        <select value={categoria} onChange={(e) => setcategoria(e.target.value)} required>
                            <option key="default" value="" disabled>Seleccione una categoría</option>
                            {categorias
                              .filter((c) => c.Id_Categoria !== undefined && c.Id_Categoria !== null)
                              .map((c) => (
                                <option key={`Categoria-${c.Id_Categoria}`} value={c.Id_Categoria}>
                                  {c.Nombre_Cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </AppLayout>
    );
};

export default RegistroSubcategoria;