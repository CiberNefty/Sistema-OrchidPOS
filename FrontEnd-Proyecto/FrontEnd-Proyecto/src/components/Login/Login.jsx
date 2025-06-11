import React, {useState} from "react";
import axios from "axios";
import "../../styles/Login/Login.css";
//import "../../styles/estilosfinal.css";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
    const [Email_Usu, setEmail] = useState("");
    const [Contraseña_hash, setPassword] = useState("");

    const handleLogin = () => {
        axios
            .post("http://127.0.0.1:5000/login", {Email_Usu, Contraseña_hash})
            .then((response) => {
                localStorage.setItem('token', response.data.access_token);
                window.location.href = "/inicio";
            })
            .catch((error) => {
                console.error("Error al iniciar sesión", error);
                alert("Error al iniciar sesión");
            });
    };
    
    return (
        <div className="login-container">
            <div className="wrapper">
                <h1>BELLA & ACTUAL</h1>
                <div className="input-box">
                    <input
                    type="email"
                    placeholder="Correo"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <PersonIcon className='icon' />
                </div>
                <div className="input-box">
                    <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <LockIcon className='icon' />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
export default Login;