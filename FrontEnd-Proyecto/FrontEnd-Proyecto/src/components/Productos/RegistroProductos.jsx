import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";

const RegistroProducto = () => {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    Nombre_Prod: '',
    Medida_Prod: '',
    Unidad_Medida_Prod: 'UNIDAD',
    Precio_Bruto_Prod: '',
    Iva_Prod: '19',
    Porcentaje_Ganancia: '30',
    Unidades_Totales_Prod: '0',
    Marca_Prod: '',
    FK_Id_Proveedor: '',
    FK_Id_Subcategoria: ''
  });
  
  // Estados para listas y UI
  const [proveedores, setProveedores] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [precioCalculado, setPrecioCalculado] = useState(null);

  // Cargar proveedores y subcategorías
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/');
      return;
    }

    const cargarDatos = async () => {
      try {
        const [proveedoresRes, subcategoriasRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/proveedores', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://127.0.0.1:5000/subcategorias', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        setProveedores(proveedoresRes.data);
        setSubcategorias(subcategoriasRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        if (error.response?.status === 401) {
          navigate('/');
        }
      }
    };

    cargarDatos();
  }, [navigate]);

  // Calcular precio neto en tiempo real
  useEffect(() => {
    const { Precio_Bruto_Prod, Iva_Prod, Porcentaje_Ganancia } = formData;
    
    if (Precio_Bruto_Prod && !isNaN(Precio_Bruto_Prod)) {
      const bruto = parseFloat(Precio_Bruto_Prod);
      const iva = parseFloat(Iva_Prod) / 100 || 0;
      const ganancia = parseFloat(Porcentaje_Ganancia) / 100 || 0;
      
      const neto = bruto * (1 + iva + ganancia);
      setPrecioCalculado(neto.toFixed(2));
    } else {
      setPrecioCalculado(null);
    }
  }, [formData.Precio_Bruto_Prod, formData.Iva_Prod, formData.Porcentaje_Ganancia]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar mensajes cuando el usuario empiece a escribir
    if (error) setError('');
    if (isSuccess) setIsSuccess(false);
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      Nombre_Prod: '',
      Medida_Prod: '',
      Unidad_Medida_Prod: 'UNIDAD',
      Precio_Bruto_Prod: '',
      Iva_Prod: '19',
      Porcentaje_Ganancia: '30',
      Unidades_Totales_Prod: '0',
      Marca_Prod: '',
      FK_Id_Proveedor: '',
      FK_Id_Subcategoria: ''
    });
    setPrecioCalculado(null);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    setIsLoading(true);

    // Validaciones
    if (!formData.Nombre_Prod.trim()) {
      setError('El nombre del producto es obligatorio.');
      setIsLoading(false);
      return;
    }

    if (!formData.Precio_Bruto_Prod || parseFloat(formData.Precio_Bruto_Prod) <= 0) {
      setError('El precio bruto debe ser mayor a cero.');
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
      setIsLoading(false);
      navigate('/');
      return;
    }

    try {
      // Preparar payload
      const payload = {
        Nombre_Prod: formData.Nombre_Prod.trim(),
        Medida_Prod: formData.Medida_Prod.trim(),
        Unidad_Medida_Prod: formData.Unidad_Medida_Prod,
        Precio_Bruto_Prod: parseFloat(formData.Precio_Bruto_Prod),
        Iva_Prod: parseFloat(formData.Iva_Prod) / 100, // Convertir a decimal
        Porcentaje_Ganancia: parseFloat(formData.Porcentaje_Ganancia) / 100, // Convertir a decimal
        Unidades_Totales_Prod: parseInt(formData.Unidades_Totales_Prod) || 0,
        Marca_Prod: formData.Marca_Prod.trim(),
        FK_Id_Proveedor: formData.FK_Id_Proveedor ? parseInt(formData.FK_Id_Proveedor) : null,
        FK_Id_Subcategoria: formData.FK_Id_Subcategoria ? parseInt(formData.FK_Id_Subcategoria) : null
      };

      console.log('📤 Enviando producto:', payload);

      const response = await axios.post('http://127.0.0.1:5000/productos', payload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Producto creado:', response.data);
      
      // Mostrar éxito SIN alert
      setIsSuccess(true);
      
      // Esperar 2 segundos para mostrar el mensaje y luego navegar
      setTimeout(() => {
        navigate('/productos', { 
          state: { 
            refresh: true,
            message: `Producto "${payload.Nombre_Prod}" registrado exitosamente`
          }
        });
      }, 2000);

    } catch (error) {
      console.error('❌ Error al registrar producto:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            setError(data.error || 'Error en los datos proporcionados.');
            break;
          case 401:
            setError('Sesión expirada. Redirigiendo...');
            setTimeout(() => navigate('/'), 1500);
            break;
          case 409:
            setError(data.error || 'Ya existe un producto con ese nombre.');
            break;
          case 500:
            setError('Error interno del servidor. Contacta al administrador.');
            break;
          default:
            setError(data.error || 'Error al registrar el producto.');
        }
      } else if (error.request) {
        setError('Sin respuesta del servidor. Verifica tu conexión.');
      } else {
        setError('Error de configuración. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="registro-container">
        <h2>Registro de Producto</h2>
        
        {/* Mensajes de estado */}
        {error && (
          <div className="mensaje-error" style={{
            color: '#d32f2f',
            backgroundColor: '#ffebee',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #ffcdd2',
            marginBottom: '16px'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {isSuccess && (
          <div className="mensaje-exito" style={{
            color: '#2e7d32',
            backgroundColor: '#e8f5e8',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #c8e6c9',
            marginBottom: '16px'
          }}>
            ✅ Producto registrado exitosamente. Redirigiendo...
        
          </div>
        )}
        
        {isLoading && (
          <div className="mensaje-carga" style={{
            color: '#1976d2',
            backgroundColor: '#e3f2fd',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #bbdefb',
            marginBottom: '16px'
          }}>
            ⏳ Guardando producto...
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre del Producto: *</label>
            <input
              type="text"
              name="Nombre_Prod"
              value={formData.Nombre_Prod}
              onChange={handleInputChange}
              required
              placeholder="Ej: Shampoo"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label>Medida del Producto:</label>
            <input
              type="text"
              name="Medida_Prod"
              value={formData.Medida_Prod}
              onChange={handleInputChange}
              placeholder="Ej: 500, 1L, 250g"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label>Unidad de Medida:</label>
            <select 
              name="Unidad_Medida_Prod"
              value={formData.Unidad_Medida_Prod} 
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="UNIDAD">UNIDAD</option>
              <option value="GRAMOS">GRAMOS</option>
              <option value="KILOGRAMOS">KILOGRAMOS</option>
              <option value="LITROS">LITROS</option>
              <option value="MILILITROS">MILILITROS</option>
              <option value="METROS">METROS</option>
              <option value="CENTIMETROS">CENTIMETROS</option>
            </select>
          </div>
          
          <div>
            <label>Precio Bruto (COP): *</label>
            <input
              type="number"
              name="Precio_Bruto_Prod"
              step="0.01"
              min="0.01"
              value={formData.Precio_Bruto_Prod}
              onChange={handleInputChange}
              required
              placeholder="Ej: 5000"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label>IVA (%):</label>
            <input
              type="number"
              name="Iva_Prod"
              step="0.01"
              min="0"
              max="100"
              value={formData.Iva_Prod}
              onChange={handleInputChange}
              placeholder="19"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label>Porcentaje de Ganancia (%):</label>
            <input
              type="number"
              name="Porcentaje_Ganancia"
              step="0.01"
              min="0"
              max="1000"
              value={formData.Porcentaje_Ganancia}
              onChange={handleInputChange}
              placeholder="30"
              disabled={isLoading}
            />
          </div>
          
          {/* Precio calculado */}
          {precioCalculado && (
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '12px',
              borderRadius: '4px',
              margin: '10px 0',
              border: '1px solid #4CAF50'
            }}>
              <strong>💰 Precio Neto: ${parseFloat(precioCalculado).toLocaleString('es-CO', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} COP</strong>
            </div>
          )}
          
          <div>
            <label>Unidades en Stock:</label>
            <input
              type="number"
              name="Unidades_Totales_Prod"
              min="0"
              value={formData.Unidades_Totales_Prod}
              onChange={handleInputChange}
              placeholder="0"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label>Marca:</label>
            <input
              type="text"
              name="Marca_Prod"
              value={formData.Marca_Prod}
              onChange={handleInputChange}
              placeholder="Ej: Nestlé, Coca-Cola"
              disabled={isLoading}
            />
          </div>
          
          <div className="select-container">
            <label className="form-label">Proveedor:</label>
            <select 
              name="FK_Id_Proveedor"
              value={formData.FK_Id_Proveedor} 
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="">Seleccionar proveedor (opcional)</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.Id_Proveedor} value={proveedor.Id_Proveedor}>
                  {proveedor.Nombre_Prov}
                </option>
              ))}
            </select>
          </div>
          
          <div className="select-container">
            <label className="form-label">Subcategoría:</label>
            <select 
              name="FK_Id_Subcategoria"
              value={formData.FK_Id_Subcategoria} 
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="">Seleccionar subcategoría (opcional)</option>
              {subcategorias.map((subcategoria) => (
                <option key={subcategoria.Id_Subcategoria} value={subcategoria.Id_Subcategoria}>
                  {subcategoria.Nombre_Subcategoria}
                </option>
              ))}
            </select>
          </div>

          <div className="botones-container" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              type="submit" 
              disabled={isLoading || isSuccess}
              style={{ flex: 1 }}
            >
              {isLoading ? 'Guardando...' : 'Registrar Producto'}
            </button>
            
            <button 
              type="button" 
              onClick={limpiarFormulario}
              disabled={isLoading || isSuccess}
              style={{ 
                flex: 1, 
                backgroundColor: '#9e9e9e',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Limpiar
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/productos')}
              disabled={isLoading}
              style={{ 
                flex: 1, 
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default RegistroProducto;