import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";


const EditarProducto = () => {
    const { Id_Producto } = useParams();
    const navigate = useNavigate();

    const [ producto, setProducto ] = useState(null);
    const [ proveedores, setProveedores ] = useState([]);
    const [ subcategorias, setSubcategorias ] = useState([]);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token) {
            navigate('/');
            return;
        }

        const fetchProducto = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/productos/${Id_Producto}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducto(res.data);
            }catch (err) {
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        const fetchProveedores = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/proveedores', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProveedores(res.data);
            }catch {
                console.error('Error al cargar proveedores.')
            }
        }

        const fetchSubcategoria = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/subcategorias', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSubcategorias(res.data);
            } catch {
                console.error('Error al obtener Subcategorias.')
            }
        }

        fetchProducto();
        fetchProveedores();
        fetchSubcategoria();

    }, [Id_Producto, navigate]);

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://127.0.0.1:5000/productos/${Id_Producto}`, {
                Nombre_Prod: producto.Nombre_Prod,
                Medida_Prod: parseFloat(producto.Medida_Prod),
                Unidad_Medida_Prod: producto.Unidad_Medida_Prod,
                Precio_Bruto_Prod: parseFloat(producto.Precio_Bruto_Prod),
                Precio_Neto_Unidad_Prod: parseFloat(producto.Precio_Neto_Unidad_Prod),
                Iva_Prod: parseFloat(producto.Iva_Prod),
                Porcentaje_Ganancia: parseFloat(producto.Porcentaje_Ganancia),
                Unidades_Totales_Prod: parseInt(producto.Unidades_Totales_Prod),
                Estado_Prod: producto.Estado_Prod,
                Marca_Prod: producto.Marca_Prod,
                FK_Id_Proveedor: parseInt(producto.proveedor),
                FK_Id_Subcategoria: parseInt(producto.subcategoria)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/productos');
        } catch (err) {
            console.error(err);
            setError('Error al actualizar el producto.')
        }
    };

    if (loading) return <p className='form-loading'>Cargando Productos...</p>;
    if (error) return <p className="form-error">{error}</p>;
    if (!producto) return <p className="form-error">Producto no encontrado.</p>;

    return (
        <div className="registro-container">
        <h2>Editar de Producto</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre Producto:</label>
                <input
                    type="text"
                    name="Nombre_Prod"
                    value={producto.Nombre_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Medida Producto:</label>
                <input
                    type="text"
                    name="Medida_Prod"
                    value={producto.Medida_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Unidad de Medida:</label>
                <input
                    type="text"
                    name="Unidad_Medida_Prod"
                    value={producto.Unidad_Medida_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio Neto:</label>
                <input
                    type="text"
                    name="Precio_Neto_Unidad_Prod"
                    value={producto.Precio_Neto_Unidad_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Iva:</label>
                <input
                    type="text"
                    name="Iva_Prod"
                    value={producto.Iva_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Porcentaje Ganancia:</label>
                <input
                    type="text"
                    name="Porcentaje_Ganancia"
                    value={producto.Porcentaje_Ganancia || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Unidades Totales:</label>
                <input
                    type="text"
                    name="Unidades_Totales_Prod"
                    value={producto.Unidades_Totales_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Estado:</label>
                <input
                    type="text"
                    name="Estado_Prod"
                    value={producto.Estado_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Marca:</label>
                <input
                    type="text"
                    name="Marca_Prod"
                    value={producto.Marca_Prod || ''}
                    onChange={handleChange}
                    required
                />
            </div>      

            <div className="select-container">
                <label className="form-label">Proveedor:</label>
                <select
                    name="proveedor"
                    value={producto.proveedor || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un proveedor</option>
                    {proveedores.map((p) => (
                        <option key={p.Id_Proveedor} value={p.Id_Proveedor}>
                            {p.Nombre_Prov}
                        </option>
                    ))}
                </select>
            </div>      

            <div className="select-container">
                <label className="form-label">Subcategoría:</label>
                <select
                    name="subcategoria"
                    value={producto.subcategoria || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una subcategoría</option>
                    {subcategorias.map((s) => (
                        <option key={s.Id_Subcategoria} value={s.Id_Subcategoria}>
                            {s.Nombre_Subcategoria}
                        </option>
                    ))}
                </select>
            </div>      

            <button type="submit">Guardar Cambios</button>
        </form>

        </div>
    );
    
}
export default EditarProducto;