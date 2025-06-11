import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Drawer, IconButton, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import LinkBehavior from './LinkBehavior';
import ListItemText from '@mui/material/ListItemText'; 
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


export default function Navbar({ onLogout }) {
    const normalizeText = (text) => text.toLowerCase().replace(' ', '-');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate('/');
    };
    const drawer = (
        <div>
            <List>
                {['Inicio', 'Perfil', 'Categorias', 'Proveedores', 'Subcategorias', 'Productos', 'Ventas', 'Historial'].map((text) => (
                    <ListItem button component={LinkBehavior} to={`/${normalizeText(text)}`} key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                {}
                <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#1E1B2E' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Bella & Actual
                    </Typography>

                    {/* Botón menú hamburguesa (móvil) */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Navegación horizontal en desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {['Inicio','Perfil', 'Usuarios', 'Categorias', 'Proveedores', 'Subcategorias', 'Productos', 'Ventas', 'Historial'].map((text) => (
                            <Button color="inherit" component={LinkBehavior} to={`/${normalizeText(text)}`} key={text}>
                                {text}
                            </Button>
                        ))}
                        {/* Botón de cerrar sesión */}
                        <Button color="error" onClick={handleLogout}>
                            <LogoutIcon/>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer para móvil */}
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
        </>
    );
}
