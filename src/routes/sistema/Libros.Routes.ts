import { Router } from "express";
import { ActualizarLibro, BuscarLibro, BuscarLibros, CrearLibro, InactivarLibro } from "../../Controlador/sistema/Libros.Controlador";
import { validarCamposLibros } from '../../Milddleware/sistema/ValidarCamposLibros';


const router = Router();

router.get('/Sistema/Libros', BuscarLibros)

router.get('/Sistema/Libros:id', BuscarLibro)

router.post('/Sistema/Libros', validarCamposLibros, CrearLibro)

router.put('/Sistema/Libros/:id', validarCamposLibros, ActualizarLibro);

router.delete('/Sistema/Libros/:id', InactivarLibro);

export default router