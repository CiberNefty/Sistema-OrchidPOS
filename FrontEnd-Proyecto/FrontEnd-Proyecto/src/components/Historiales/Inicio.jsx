import React from 'react'
import AppLayout from './AppLayout'
import '../../styles/estilosfinal.css'

export default function Inicio() {
return (
<AppLayout title="PANEL PRINCIPAL">
<hr />
  {/* Tarjetas resumen */}
  <div className="dashboard-cards">
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-value">1,248</div>
          <div className="card-title">Productos en Inventario</div>
        </div>
        <div className="card-icon blue">
          <i className="fas fa-boxes"></i>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-value">42</div>
          <div className="card-title">Productos Bajos en Stock</div>
        </div>
        <div className="card-icon orange">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-value">78</div>
          <div className="card-title">Ventas Hoy</div>
        </div>
        <div className="card-icon green">
          <i className="fas fa-receipt"></i>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-value">5</div>
          <div className="card-title">Alertas</div>
        </div>
        <div className="card-icon red">
          <i className="fas fa-bell"></i>
        </div>
      </div>
    </div>
  </div>

  {/* Últimos movimientos */}
  <div className="tabla-container">
    <h3 style={{ marginBottom: '15px' }}>Últimos Movimientos</h3>
    <table className="tabla-historial">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-05-16 16:20</td>
          <td>Venta</td>
          <td>Venta #108 - $64,300</td>
          <td>Laura</td>
        </tr>
        <tr>
          <td>2025-05-16 15:30</td>
          <td>Ingreso</td>
          <td>Producto PRD112 - 50 unidades</td>
          <td>Administrador</td>
        </tr>
      </tbody>
    </table>
  </div>
</AppLayout>
)
}