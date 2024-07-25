import { Router } from "express";
import { BuscarUsuario, BuscarUsuarios, CrearUsuario, ActualizarUsuario, InactivarUsuario } from "../../Controlador/seguridad/Usuarios.Controlador";
import { validarCamposUsuario } from '../../Milddleware/seguridad/ValidarCamposUsuario'; // Ajusta la ruta según tu estructura de archivos


const router = Router();

router.get('/Seguridad/Usuarios', BuscarUsuarios)

router.get('/Seguridad/Usuarios/:id', BuscarUsuario)

router.post('/Seguridad/Usuarios', validarCamposUsuario, CrearUsuario)

router.put('/Seguridad/Usuarios/:id', validarCamposUsuario, ActualizarUsuario);

router.delete('/Seguridad/Usuarios/:id', InactivarUsuario);

export default router