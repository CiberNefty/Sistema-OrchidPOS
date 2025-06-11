import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/estilosfinal.css";
const RegistroUsers = () => {
    const navigate = useNavigate();
    const [Nombre_Usu, setNombre_Usu] = useState('');
    const [Contraseña_hash, setContraseña_hash] = useState('');
    const [Cedula_Usu, setCedula_Usu] = useState('');
    const [Email_Usu, setEmail_Usu] = useState('');
    const [Telefono_Usu, setTelefono_Usu] = useState('');
    const [Fecha_Contrato_Inicio, setFecha_Contrato_Inicio] = useState('');
    const [rol, setrol] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:5000/roles', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then(response => {
            setRoles(response.data);
            console.log("Roles recibidos:", response.data);
        })
        .catch(error => {
            console.error('Error al obtener los roles:', error);
        });
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!Nombre_Usu || !Contraseña_hash || !Cedula_Usu || !Email_Usu || !Telefono_Usu || !Fecha_Contrato_Inicio || !rol) {
        setError('Por favor, completa todos los campos.');
        setIsLoading(false);
        return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://127.0.0.1:5000/usuarios', {
                Nombre_Usu,
                Contraseña_hash,
                Cedula_Usu,
                Email_Usu,
                Telefono_Usu,
                Fecha_Contrato_Inicio,
                Id_Rol: rol,
            }, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });

            console.log('Proveedor agregado:', response.data);
            navigate('/usuarios')
            setNombre_Usu('');
            setContraseña_hash('');
            setCedula_Usu('');
            setEmail_Usu('');
            setTelefono_Usu('');
            setFecha_Contrato_Inicio('');
            setrol('');
            } catch (error) {
            console.error('Error al registrar el usuario', error);
            if (error.response) {
                if (error.response.status === 400) {
                setError('Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.');
                } else if (error.response.status === 401) {
                setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                navigate('/login');
                } else {
                setError('Error al registrar el usuario. Intenta nuevamente más tarde.');
                }
            } else {
                setError('Error de conexión. Por favor, intenta nuevamente más tarde.');
            }
            } finally {
            setIsLoading(false);
            }
        };

    return (
        <div className="registro-container">
        <h2>Registro de Usuario</h2>
        {error && <p className="error">{error}</p>}
        {isLoading && <p>Cargando...</p>}
        <form onSubmit={manejarEnvio}>
            <div>
            <label>Nombre Usuario:</label>
            <input
                type="text"
                value={Nombre_Usu}
                onChange={(e) => setNombre_Usu(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Contraseña:</label>
            <input
                type="text"
                value={Contraseña_hash}
                onChange={(e) => setContraseña_hash(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Cedula:</label>
            <input
                type="text"
                value={Cedula_Usu}
                onChange={(e) => setCedula_Usu(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Email:</label>
            <input
                type="text"
                value={Email_Usu}
                onChange={(e) => setEmail_Usu(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Telefono:</label>
            <input
                type="text"
                value={Telefono_Usu}
                onChange={(e) => setTelefono_Usu(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Fecha de Contrato:</label>
            <input
                type="date"
                value={Fecha_Contrato_Inicio}
                onChange={(e) => setFecha_Contrato_Inicio(e.target.value)}
                required
            />
            </div>
            <div className="select-container"> 
                <label className="form-label">Rol:</label>
                <select value={rol} onChange={(e) => setrol(e.target.value)} required>
                    <option key="default" value="" disabled>Seleccione un rol</option>
                    {roles
                      .filter((r) => r.Id_Rol !== undefined && r.Id_Rol !== null)
                      .map((r) => (
                        <option key={`rol-${r.Id_Rol}`} value={r.Id_Rol}>
                          {r.Nombre}
                        </option>
                    ))}
                </select>
            </div>
  
            <button type="submit">Registrarse</button>
        </form>
        </div>
    );
};

export default RegistroUsers;