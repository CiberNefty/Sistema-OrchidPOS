import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Historiales/AppLayout';
import "../../styles/estilosfinal.css";

const RegistroCategoria = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre_Cat: '',
    Descripcion_Cat: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes al escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const { Nombre_Cat, Descripcion_Cat } = formData;
    
    if (!Nombre_Cat.trim()) {
      setError('El nombre de la categoría es requerido');
      return false;
    }
    
    if (Nombre_Cat.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return false;
    }
    
    if (!Descripcion_Cat.trim()) {
      setError('La descripción es requerida');
      return false;
    }
    
    if (Descripcion_Cat.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres');
      return false;
    }
    
    return true;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;

    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const dataToSend = {
        Nombre_Cat: formData.Nombre_Cat.trim(),
        Descripcion_Cat: formData.Descripcion_Cat.trim()
      };

      console.log('📤 Enviando datos:', dataToSend);

      const response = await axios.post(
        'http://127.0.0.1:5000/categorias', 
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Respuesta exitosa:', response.data);
      
      setSuccess('Categoría registrada exitosamente');
      setFormData({ Nombre_Cat: '', Descripcion_Cat: '' });
      
      // Navegar después de mostrar éxito
      setTimeout(() => navigate('/categorias'), 1500);

    } catch (error) {
      console.error('❌ Error al registrar:', error);
      
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.status === 401) {
        setError('Sesión expirada. Redirigiendo...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('Error de conexión. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="REGISTRO DE CATEGORÍA">
      <div className="registro-container">
        <h2 className="form-title">Registro de Categoría</h2>
        
        {error && (
          <div className="alert alert-error">
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="form">
          <div className="form-group">
            <label className="form-label">Nombre de Categoría *</label>
            <input
              type="text"
              name="Nombre_Cat"
              value={formData.Nombre_Cat}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej: Electrónicos"
              disabled={isLoading}
              maxLength={80}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <textarea
              name="Descripcion_Cat"
              value={formData.Descripcion_Cat}
              onChange={handleChange}
              className="form-input"
              placeholder="Describe la categoría..."
              disabled={isLoading}
              rows={3}
              maxLength={150}
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="form-button primary"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar Categoría'}
            </button>
            
            <button 
              type="button" 
              className="form-button secondary"
              onClick={() => navigate('/categorias')}
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default RegistroCategoria;