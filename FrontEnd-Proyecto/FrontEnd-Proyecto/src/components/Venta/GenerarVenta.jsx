import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/estilosfinal.css"; 

const GenerarVenta = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [FK_Id_Usuario, setFK_Id_Usuario] = useState('');
  const [detalle_Venta, setDetalleVenta] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:5000/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setUsuarios(response.data))
    .catch(error => console.error('Error al obtener usuarios', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:5000/productos', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setProductos(response.data))
    .catch(error => console.error('Error al obtener productos', error));
  }, []);

  const handleAddProducto = () => {
    if (!productoId || !cantidad) {
      alert('Complete producto y cantidad.');
      return;
    }

    const producto = productos.find(p => p.Id_Producto === parseInt(productoId));
    if (producto.Unidades_Totales_Prod < cantidad) {
      alert('Stock insuficiente.');
      return;
    }

    setDetalleVenta([...detalle_Venta, {
      FK_Id_Producto: parseInt(productoId),
      Cantidad: parseInt(cantidad)
    }]);
    setProductoId('');
    setCantidad('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (detalle_Venta.length === 0) {
      alert('Seleccione o agregue productos.');
      return;
    }

    const nuevaVenta = {
      FK_Id_Usuario: parseInt(FK_Id_Usuario),
      detalle_Venta
    };

    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:5000/ventas', nuevaVenta, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Venta generada con éxito');
      navigate('/ventas');
    })
    .catch(error => {
      console.error('Error al generar venta', error);
      alert(error.response?.data?.error || 'Error desconocido al generar la venta.');
    });
  };

  return (
    <div className="venta-container">
      <h2 className="venta-title">Generar Venta</h2>
      <form onSubmit={handleSubmit} className="venta-form">
        <div className="form-group">
          <label>Producto</label>
          <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
            <option value="">Seleccionar producto</option>
            {productos.map(producto => (
              <option key={producto.Id_Producto} value={producto.Id_Producto}>
                {producto.Nombre_Prod}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            min="1"
          />
        </div>

        <button type="button" className="btn-add" onClick={handleAddProducto}>
          Agregar Producto
        </button>

        <div className="detalle-venta">
          <h3>Detalle de la Venta</h3>
          <ul>
            {detalle_Venta.map((detalle, index) => {
              const prod = productos.find(p => p.Id_Producto === detalle.FK_Id_Producto);
              return (
                <li key={index}>
                  {prod?.Nombre_Prod || 'Producto desconocido'} - Cantidad: {detalle.Cantidad}
                </li>
              );
            })}
          </ul>
        </div>

        <button type="submit" className="btn-submit">Generar Venta</button>
      </form>
    </div>
  );
};

export default GenerarVenta;
