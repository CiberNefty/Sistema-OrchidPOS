import React, { useEffect, useState } from 'react'
import AppLayout from './AppLayout'
import '../../styles/DetalleVenta.css'

export default function DetalleVenta() {
const [idVenta, setIdVenta] = useState('108')

useEffect(() => {
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id') || '108'
setIdVenta(id)
// Aquí iría una llamada a tu API si fuera necesario
console.log('Cargando detalle para venta ID:', id)
}, [])

return (
<AppLayout title={'DETALLE DE VENTA #${idVenta}'}>
<div className="venta-container">
{/* Tarjeta de información */}
<div className="venta-card">
<div className="venta-info">
<div className="info-item">
<span className="info-label">ID Venta:</span>
<span className="info-value">#{idVenta}</span>
</div>
<div className="info-item">
<span className="info-label">Fecha:</span>
<span className="info-value">2025-05-16 16:20:45</span>
</div>
<div className="info-item">
<span className="info-label">Vendedor:</span>
<span className="info-value">Laura (ID: 2)</span>
</div>
<div className="info-item">
<span className="info-label">Forma de Pago:</span>
<span className="info-value">Tarjeta de Crédito</span>
</div>
<div className="info-item">
<span className="info-label">Estado:</span>
<span className="info-value">Completada</span>
</div>
</div>
</div>
    {/* Tarjeta búsqueda */}
    <div className="busqueda-card">
      <div className="busqueda-header">
        <i className="fas fa-search"></i> Buscar Venta
      </div>
      <div className="busqueda-form">
        <input type="text" placeholder="Ingrese ID de venta" />
        <button className="btn btn-primary">
          <i className="fas fa-search"></i> Buscar
        </button>
      </div>
    </div>
  </div>

  {/* Tabla detalle */}
  <div className="tabla-container">
    <table className="tabla-detalle">
      <thead>
        <tr>
          <th>Id Detalle</th>
          <th>Id Venta</th>
          <th>Id Producto</th>
          <th>Producto</th>
          <th className="text-center">Cantidad</th>
          <th className="text-right">Precio Unitario</th>
          <th className="text-right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>45</td>
          <td>{idVenta}</td>
          <td>PRD112</td>
          <td>Esmalte de uñas OPI - Rojo Pasión</td>
          <td className="text-center">2</td>
          <td className="text-right">$18,500</td>
          <td className="text-right">$37,000</td>
        </tr>
        <tr>
          <td>46</td>
          <td>{idVenta}</td>
          <td>PRD078</td>
          <td>Crema Hidratante Nivea - Coco</td>
          <td className="text-center">1</td>
          <td className="text-right">$15,300</td>
          <td className="text-right">$15,300</td>
        </tr>
        <tr>
          <td>47</td>
          <td>{idVenta}</td>
          <td>PRD045</td>
          <td>Labial MAC - Matte Ruby Woo</td>
          <td className="text-center">1</td>
          <td className="text-right">$12,000</td>
          <td className="text-right">$12,000</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Resumen */}
  <div className="resumen-venta">
    <div className="total-venta">
      <span className="total-label">TOTAL VENTA:</span>
      <span className="total-value">$64,300</span>
    </div>
  </div>

  {/* Acciones */}
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
    <button className="btn btn-print" onClick={() => window.print()}>
      <i className="fas fa-print"></i> Imprimir
    </button>
    <button className="btn btn-primary" onClick={() => (window.location.href = '/historial-venta')}>
      <i className="fas fa-arrow-left"></i> Volver al Historial
    </button>
  </div>
</AppLayout>
)}