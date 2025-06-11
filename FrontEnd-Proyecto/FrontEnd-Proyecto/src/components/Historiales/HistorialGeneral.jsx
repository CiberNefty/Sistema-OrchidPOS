import React from 'react'
import '../../styles/estilosfinal.css'
import AppLayout from './AppLayout'

export default function HistorialGeneral() {
return (
<AppLayout title='HISTORIAL GENERAL'>

  <hr />

  {/* Filtros */}
  <div className="filtros">
    <div>
      <label htmlFor="fecha-desde">Desde:</label>
      <input type="date" id="fecha-desde" name="fecha-desde" />
    </div>

    <div>
      <label htmlFor="id-producto">ID Producto:</label>
      <input type="text" id="id-producto" name="id-producto" placeholder="ID Producto" />
    </div>

    <div>
      <label htmlFor="usuario">Usuario:</label>
      <select id="usuario" name="usuario">
        <option value="">Todos</option>
        <option value="Usuario1">Usuario1</option>
        <option value="Usuario2">Usuario2</option>
      </select>
    </div>

    <div>
      <label htmlFor="tipo-cambio">Tipo de Cambio:</label>
      <select id="tipo-cambio" name="tipo-cambio">
        <option value="">Todos</option>
        <option value="Ingreso">Ingreso</option>
        <option value="Actualizacion">Actualización</option>
        <option value="Eliminacion">Eliminación</option>
      </select>
    </div>
  </div>

  {/* Tabla */}
  <div className="tabla-container">
    <table className="tabla-historial">
      <thead>
        <tr>
          <th>Id Movimiento</th>
          <th>Fecha Cambio</th>
          <th>Id Rol</th>
          <th>Usuario</th>
          <th>Id Producto</th>
          <th>Producto</th>
          <th>Marca</th>
          <th>Tipo de cambio</th>
          <th>Cantidad</th>
          <th>Descripción Operación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2025-04-30 14:30</td>
          <td>2</td>
          <td>Laura</td>
          <td>PRD001</td>
          <td>Teclado</td>
          <td>Logitech</td>
          <td>Periférico</td>
          <td>150</td>
          <td>Compra inicial de stock</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2025-05-02 09:15</td>
          <td>1</td>
          <td>Admin</td>
          <td>PRD045</td>
          <td>Labial</td>
          <td>MAC</td>
          <td>Maquillaje</td>
          <td>-5</td>
          <td>Venta a cliente</td>
        </tr>
        <tr>
          <td>3222</td>
          <td>2025-05-01 16:20</td>
          <td>3</td>
          <td>Carlos</td>
          <td>PRD078</td>
          <td>Crema Hidratante</td>
          <td>Nivea</td>
          <td>Cuidado Personal</td>
          <td>30</td>
          <td>Reabastecimiento</td>
        </tr>
        <tr>
          <td>4</td>
          <td>2025-04-28 11:45</td>
          <td>1</td>
          <td>Admin</td>
          <td>PRD112</td>
          <td>Esmalte</td>
          <td>OPI</td>
          <td>Maquillaje</td>
          <td>-12</td>
          <td>Venta mayorista</td>
        </tr>
      </tbody>
    </table>
  </div>

</AppLayout>

)}