"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InactivarLibro = exports.ActualizarLibro = exports.CrearLibro = exports.BuscarLibro = exports.BuscarLibros = void 0;
const Libros_1 = require("../../entidades/sistema/Libros");
const db_1 = require("../../db");
const BuscarLibros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const librosRepository = db_1.AppDataSource.getRepository(Libros_1.Libros);
        const libros = yield librosRepository.find();
        const columns = [
            { title: "Id", data: "Id" },
            { title: "ISBN", data: "ISBN" },
            { title: "Autor", data: "Autor" },
            { title: "Titulo", data: "Titulo" },
            { title: "Editorial", data: "Editorial" },
            { title: "Fecha Publicacion", data: "FechaPublicacion" },
        ];
        res.status(200).json({
            message: "Success",
            draw: req.body.draw || 0, // default value if draw is not provided
            recordsTotal: libros.length,
            recordsFiltered: libros.length,
            data: libros,
            columns: columns
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al buscar los libros",
            error: error.message || "Error desconocido",
            detail: error.detail || ""
        });
    }
});
exports.BuscarLibros = BuscarLibros;
const BuscarLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const libroRepository = db_1.AppDataSource.getRepository(Libros_1.Libros);
        const libro = yield libroRepository.findOne({ where: { Id: Number(id) } });
        if (!libro) {
            return res.status(404).json({
                message: "libro no encontrado",
            });
        }
        res.status(200).json({
            message: "Libro encontrado exitosamente",
            data: libro
        });
    }
    catch (error) {
        console.error(error);
        let errorMessage = "Error desconocido";
        let errorDetail = "";
        if (error && typeof error === "object" && "message" in error) {
            errorMessage = error.message;
        }
        if (error && typeof error === "object" && "detail" in error) {
            errorDetail = error.detail;
        }
        res.status(500).json({
            message: "Error al buscar el libro",
            error: errorMessage,
            detail: errorDetail
        });
    }
});
exports.BuscarLibro = BuscarLibro;
const CrearLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const libroRepository = db_1.AppDataSource.getRepository(Libros_1.Libros);
        const libro = libroRepository.create(req.body);
        yield libroRepository.save(libro);
        res.status(201).json({
            message: "libro creado exitosamente",
            data: libro
        });
    }
    catch (error) {
        console.error(error);
        let errorMessage = "Error desconocido";
        let errorDetail = "";
        if (error && typeof error === "object" && "message" in error) {
            errorMessage = error.message;
        }
        if (error && typeof error === "object" && "detail" in error) {
            errorDetail = error.detail;
        }
        res.status(500).json({
            message: "Error al crear el libro",
            error: errorMessage,
            detail: errorDetail
        });
    }
});
exports.CrearLibro = CrearLibro;
const ActualizarLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const libroRepository = db_1.AppDataSource.getRepository(Libros_1.Libros);
        // Verificar si el libro existe
        const libroExistente = yield libroRepository.findOne({ where: { Id: Number(id) } });
        if (!libroExistente) {
            return res.status(404).json({
                message: `Libro con id ${id} no encontrado`
            });
        }
        // Actualizar solo los campos específicos proporcionados en el cuerpo de la solicitud
        libroRepository.merge(libroExistente, req.body);
        // Guardar el usuario actualizado
        const libroActualizado = yield libroRepository.save(libroExistente);
        // Verificar si se actualizó correctamente
        if (libroActualizado) {
            res.status(200).json({
                message: "Libro actualizado exitosamente",
                data: libroActualizado
            });
        }
        else {
            res.status(404).json({
                message: `Libro con id ${id} no encontrado después de la actualización`
            });
        }
    }
    catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({
            message: "Error al actualizar el usuario",
            error: errorMessage
        });
    }
});
exports.ActualizarLibro = ActualizarLibro;
const InactivarLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const libroRepository = db_1.AppDataSource.getRepository(Libros_1.Libros);
        // Verificar si el usuario existe
        const libroExistente = yield libroRepository.findOne({ where: { Id: Number(id) } });
        if (!libroExistente) {
            return res.status(404).json({
                message: `Libro con id ${id} no encontrado`
            });
        }
        // Verificar si el estado enviado es 'Inactivo'
        if (req.body.Estado !== 'Inactivo') {
            return res.status(400).json({
                message: "Este libro no se puede Inactivar. El estado debe ser 'Inactivo'."
            });
        }
        // Verificar si el estado actual del usuario ya es 'Inactivo'
        if (libroExistente.Estado === 'Inactivo') {
            return res.status(400).json({
                message: "El usuario ya se encuentra desactivado."
            });
        }
        // Actualizar el estado del usuario a 'Inactivo'
        libroExistente.Estado = req.body.Estado;
        // Guardar el usuario con el estado actualizado
        const libroActualizado = yield libroRepository.save(libroExistente);
        // Verificar si se actualizó correctamente
        if (libroActualizado) {
            res.status(200).json({
                message: "Libro desactivado exitosamente",
            });
        }
        else {
            res.status(404).json({
                message: `Libro con id ${id} no encontrado después de la actualización`
            });
        }
    }
    catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({
            message: "Error al actualizar el libro",
            error: errorMessage
        });
    }
});
exports.InactivarLibro = InactivarLibro;
