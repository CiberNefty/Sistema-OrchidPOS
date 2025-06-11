import React, { useState } from 'react'
import AppLayout from './AppLayout'
import '../../styles/estilosfinal.css'

export default function Contacto() {
const [form, setForm] = useState({
nombre: '',
email: '',
telefono: '',
asunto: '',
mensaje: ''
})

const handleChange = (e) => {
const { name, value } = e.target
setForm({ ...form, [name]: value })
}

const handleSubmit = (e) => {
e.preventDefault()
const { nombre, email, mensaje } = form
if (!nombre || !email || !mensaje) {
alert('Por favor complete todos los campos requeridos')
return
}
alert('Mensaje enviado con éxito')
setForm({
nombre: '',
email: '',
telefono: '',
asunto: '',
mensaje: ''
})
}

return (
<AppLayout title="CONTACTO">
<form className="form-contacto" onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="nombre">Nombre Completo:</label>
<input type="text" id="nombre" name="nombre" className="form-control" required value={form.nombre} onChange={handleChange} />
</div>

    <div className="form-group">
      <label htmlFor="email">Correo Electrónico:</label>
      <input type="email" id="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="telefono">Teléfono:</label>
      <input type="tel" id="telefono" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="asunto">Asunto:</label>
      <select id="asunto" name="asunto" className="form-control" required value={form.asunto} onChange={handleChange}>
        <option value="">Seleccione un asunto</option>
        <option value="soporte">Soporte Técnico</option>
        <option value="ventas">Consultas de Ventas</option>
        <option value="productos">Información de Productos</option>
        <option value="otros">Otros</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="mensaje">Mensaje:</label>
      <textarea id="mensaje" name="mensaje" className="form-control" rows="5" required value={form.mensaje} onChange={handleChange}></textarea>
    </div>

    <div style={{ textAlign: 'right', marginTop: '20px' }}>
      <button type="submit" className="btn btn-primary">
        <i className="fas fa-paper-plane"></i> Enviar Mensaje
      </button>
    </div>
  </form>

  <div className="venta-info" style={{ marginTop: '30px' }}>
    <div className="info-item">
      <span className="info-label"><i className="fas fa-map-marker-alt"></i> Dirección:</span>
      <span className="info-value">Calle 123 #45-67, Bogotá, Colombia</span>
    </div>
    <div className="info-item">
      <span className="info-label"><i className="fas fa-phone"></i> Teléfono:</span>
      <span className="info-value">+57 1 2345678</span>
    </div>
    <div className="info-item">
      <span className="info-label"><i className="fas fa-envelope"></i> Email:</span>
      <span className="info-value">contacto@bellayactual.com</span>
    </div>
    <div className="info-item">
      <span className="info-label"><i className="fas fa-clock"></i> Horario:</span>
      <span className="info-value">Lunes a Viernes: 8:00 AM - 6:00 PM</span>
    </div>
  </div>
</AppLayout>
)}