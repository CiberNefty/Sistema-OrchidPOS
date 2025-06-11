import React, { useState } from 'react'
import AppLayout from './AppLayout'
import '../../styles/estilosfinal.css'

export default function Ventas() {
  const [busqueda, setBusqueda] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [productos, setProductos] = useState([])
  const [total, setTotal] = useState(0)
  const [productoEncontrado, setProductoEncontrado] = useState(null)

  // Simulación de productos de BD - esto vendría de tu API
  const productosBD = [
    { id: 101, nombre: 'Crema Hidratante Premium', precio: 45000 },
    { id: 102, nombre: 'Shampoo Anticaspa', precio: 32000 },
    { id: 103, nombre: 'Labial Mate Rojo', precio: 28000 },
    { id: 104, nombre: 'Protector Solar FPS 50', precio: 55000 },
    { id: 105, nombre: 'Perfume Floral', precio: 120000 }
  ]

  // Función para buscar producto por ID o nombre
  const buscarProducto = async (termino) => {
    if (!termino.trim()) {
      setProductoEncontrado(null)
      return
    }

    // Simular llamada a API - reemplaza esto con tu llamada real
    try {
      const producto = productosBD.find(p => 
        p.id.toString() === termino.toString() || 
        p.nombre.toLowerCase().includes(termino.toLowerCase())
      )
      
      setProductoEncontrado(producto || null)
    } catch (error) {
      console.error('Error buscando producto:', error)
      setProductoEncontrado(null)
    }
  }

  // Manejar cambio en el campo de búsqueda
  const handleBusquedaChange = (e) => {
    const valor = e.target.value
    setBusqueda(valor)
    buscarProducto(valor)
  }

  const agregarProducto = () => {
    if (!productoEncontrado) return alert('Producto no encontrado')
    if (cantidad <= 0) return alert('Cantidad inválida')

    const existente = productos.find(p => p.id === productoEncontrado.id)
    let nuevosProductos

    if (existente) {
      nuevosProductos = productos.map(p =>
        p.id === existente.id
          ? {
              ...p,
              cantidad: p.cantidad + cantidad,
              subtotal: (p.cantidad + cantidad) * p.precio
            }
          : p
      )
    } else {
      nuevosProductos = [
        ...productos,
        {
          id: productoEncontrado.id,
          nombre: productoEncontrado.nombre,
          precio: productoEncontrado.precio,
          cantidad,
          subtotal: cantidad * productoEncontrado.precio
        }
      ]
    }

    setProductos(nuevosProductos)
    setTotal(nuevosProductos.reduce((sum, p) => sum + p.subtotal, 0))
    setBusqueda('')
    setCantidad(1)
    setProductoEncontrado(null)
  }

  const eliminarProducto = (id) => {
    const nuevos = productos.filter(p => p.id !== id)
    setProductos(nuevos)
    setTotal(nuevos.reduce((sum, p) => sum + p.subtotal, 0))
  }

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return

    const nuevosProductos = productos.map(p =>
      p.id === id
        ? {
            ...p,
            cantidad: nuevaCantidad,
            subtotal: nuevaCantidad * p.precio
          }
        : p
    )

    setProductos(nuevosProductos)
    setTotal(nuevosProductos.reduce((sum, p) => sum + p.subtotal, 0))
  }

  const finalizarVenta = () => {
    if (productos.length === 0) return alert('No hay productos en la venta')
    
    // Aquí harías la llamada a tu API para registrar la venta
    const ventaData = {
      productos,
      total,
      fecha: new Date().toISOString()
    }
    
    console.log('Datos de venta:', ventaData)
    alert(`Venta finalizada. Total: $${total.toLocaleString()}`)
    setProductos([])
    setTotal(0)
  }

  const limpiarFormulario = () => {
    setBusqueda('')
    setCantidad(1)
    setProductoEncontrado(null)
  }

  return (
    <AppLayout title="PUNTO DE VENTA">
      <div className="ventas-container">
        <hr />
        
        {/* Búsqueda y ingreso de producto */}
        <div className="ingreso-producto">
          <h3><i className="fas fa-plus-circle"></i> Buscar y Agregar Producto</h3>
          
          <div className="busqueda-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="busqueda">
                  <i className="fas fa-search"></i> Buscar por ID o Nombre
                </label>
                <input
                  type="text"
                  id="busqueda"
                  value={busqueda}
                  onChange={handleBusquedaChange}
                  placeholder="Ej: 101 o 'Crema'"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="cantidad">
                  <i className="fas fa-sort-numeric-up"></i> Cantidad
                </label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                  placeholder="Ej: 2"
                  min={1}
                />
              </div>
            </div>

            {/* Mostrar producto encontrado */}
            {productoEncontrado && (
              <div className="producto-preview">
                <div className="producto-info">
                  <strong>ID:</strong> {productoEncontrado.id} | 
                  <strong> Producto:</strong> {productoEncontrado.nombre} | 
                  <strong> Precio:</strong> ${productoEncontrado.precio.toLocaleString()}
                </div>
                <div className="producto-subtotal">
                  <strong>Subtotal: ${(productoEncontrado.precio * cantidad).toLocaleString()}</strong>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button 
                className="btn btn-agregar" 
                onClick={agregarProducto}
                disabled={!productoEncontrado}
              >
                <i className="fas fa-cart-plus"></i> Agregar a la Venta
              </button>
              <button className="btn btn-secundario" onClick={limpiarFormulario}>
                <i className="fas fa-eraser"></i> Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla productos agregados */}
        <div className="tabla-container">
          <h3>
            <i className="fas fa-shopping-cart"></i> 
            Productos en la Venta ({productos.length})
          </h3>
          <div className="tabla-responsive">
            <table className="tabla-historial tabla-productos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td className="text-center">{producto.id}</td>
                    <td className="text-left">{producto.nombre}</td>
                    <td className="text-center">${producto.precio.toLocaleString()}</td>
                    <td className="text-center">
                      <div className="cantidad-control">
                        <button 
                          className="btn-cantidad"
                          onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                        >
                          -
                        </button>
                        <span className="cantidad-display">{producto.cantidad}</span>
                        <button 
                          className="btn-cantidad"
                          onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center subtotal">${producto.subtotal.toLocaleString()}</td>
                    <td className="text-center">
                      <button 
                        className="btn btn-eliminar" 
                        onClick={() => eliminarProducto(producto.id)}
                        title="Eliminar producto"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <div className="empty-content">
                        <i className="fas fa-shopping-cart"></i>
                        <p>No hay productos en la venta</p>
                        <small>Busca y agrega productos usando el formulario superior</small>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de venta */}
        <div className="resumen-venta">
          <div className="total-venta">
            <span className="total-label">Total de la Venta</span>
            <span className="total-amount">${total.toLocaleString()}</span>
          </div>
          <div className="acciones-venta">
            <button 
              className="btn btn-finalizar" 
              onClick={finalizarVenta}
              disabled={productos.length === 0}
            >
              <i className="fas fa-check-circle"></i> Finalizar Venta
            </button>
            <a href="/historial-venta" className="btn btn-historial">
              <i className="fas fa-history"></i> Ver Historial
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}