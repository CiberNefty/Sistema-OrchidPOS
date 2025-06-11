import React, { useEffect } from 'react'
import AppLayout from './AppLayout'
//import '../estilos.css'
import '../../styles/Historiales/historial-venta.css'
//import '../../styles/estilosfinal.css'

export default function HistorialVenta() {
useEffect(() => {
const hoy = new Date().toISOString().split('T')[0]
const fechaHasta = document.getElementById('fecha-hasta')
if (fechaHasta) fechaHasta.value = hoy
}, [])

const verDetalle = (idVenta) => {
window.location.href = '/detalle-venta?id=${idVenta}'
}

return (
<AppLayout title="HISTORIAL DE VENTAS">
<hr />
  <div className="fitros">
    <div>
      <label htmlFor="id-venta">ID Venta:</label>
      <input type="text" id="id-venta" name="id-venta" placeholder="ID Venta" />
    </div>

    <div>
      <label htmlFor="fecha-desde">Desde:</label>
      <input type="date" id="fecha-desde" name="fecha-desde" />
    </div>

    <div>
      <label htmlFor="fecha-hasta">Hasta:</label>
      <input type="date" id="fecha-hasta" name="fecha-hasta" />
    </div>

    <div>
      <label htmlFor="usuario">Vendedor:</label>
      <select id="usuario" name="usuario">
        <option value="">Todos</option>
        <option value="1">Laura</option>
        <option value="2">Carlos</option>
        <option value="3">Administrador</option>
      </select>
    </div>

    <div>
      <label htmlFor="monto-minimo">Monto Mínimo:</label>
      <input type="number" id="monto-minimo" name="monto-minimo" placeholder="$" />
    </div>

    <div>
      <label htmlFor="monto-maximo">Monto Máximo:</label>
      <input type="number" id="monto-maximo" name="monto-maximo" placeholder="$" />
    </div>

    <div className="filtros-actions">
      <button className="btn btn-primary" onClick={() => verDetalle('ID_VENTA')}>
        <i className="fas fa-eye"></i> Ver Detalles de una venta
      </button>
    </div>
  </div>

  <div className="tabla-container">
    <table className="tabla-historial">
      <thead>
        <tr>
          <th>ID Historial</th>
          <th>ID Venta</th>
          <th>Fecha</th>
          <th>Vendedor</th>
          <th>Total Venta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>105</td>
          <td>2025-05-15 14:30:22</td>
          <td>Laura (ID: 2)</td>
          <td>$120,000</td>
          <td>
            <button className="btn-detalle" onClick={() => verDetalle(105)}>
              <i className="fas fa-eye"></i> Detalle
            </button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>106</td>
          <td>2025-05-15 15:45:10</td>
          <td>Administrador (ID: 1)</td>
          <td>$85,500</td>
          <td>
            <button className="btn-detalle" onClick={() => verDetalle(106)}>
              <i className="fas fa-eye"></i> Detalle
            </button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>107</td>
          <td>2025-05-16 10:15:33</td>
          <td>Carlos (ID: 3)</td>
          <td>$210,750</td>
          <td>
            <button className="btn-detalle" onClick={() => verDetalle(107)}>
              <i className="fas fa-eye"></i> Detalle
            </button>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>108</td>
          <td>2025-05-16 16:20:45</td>
          <td>Laura (ID: 2)</td>
          <td>$64,300</td>
          <td>
            <button className="btn-detalle" onClick={() => verDetalle(108)}>
              <i className="fas fa-eye"></i> Detalle
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</AppLayout>
)}