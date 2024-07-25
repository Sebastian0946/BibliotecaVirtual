"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuarios_Controlador_1 = require("../../Controlador/seguridad/Usuarios.Controlador");
const ValidarCamposUsuario_1 = require("../../Milddleware/seguridad/ValidarCamposUsuario"); // Ajusta la ruta según tu estructura de archivos
const router = (0, express_1.Router)();
router.get('/Seguridad/Usuarios', Usuarios_Controlador_1.BuscarUsuarios);
router.get('/Seguridad/Usuarios/:id', Usuarios_Controlador_1.BuscarUsuario);
router.post('/Seguridad/Usuarios', ValidarCamposUsuario_1.validarCamposUsuario, Usuarios_Controlador_1.CrearUsuario);
router.put('/Seguridad/Usuarios/:id', ValidarCamposUsuario_1.validarCamposUsuario, Usuarios_Controlador_1.ActualizarUsuario);
router.delete('/Seguridad/Usuarios/:id', Usuarios_Controlador_1.InactivarUsuario);
exports.default = router;
