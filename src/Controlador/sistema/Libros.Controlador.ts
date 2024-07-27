import { Response, Request } from "express";
import { Libros } from "../../entidades/sistema/Libros";
import { AppDataSource } from "../../db";

export const BuscarLibros = async (req: Request, res: Response) => {
    try {
        const librosRepository = AppDataSource.getRepository(Libros);
        const libros = await librosRepository.find();

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
    } catch (error: any) {
        console.error(error);

        res.status(500).json({
            message: "Error al buscar los libros",
            error: error.message || "Error desconocido",
            detail: error.detail || ""
        });
    }
};

export const BuscarLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const libroRepository = AppDataSource.getRepository(Libros);
        const libro = await libroRepository.findOne({ where: { Id: Number(id) } });

        if (!libro) {
            return res.status(404).json({
                message: "libro no encontrado",
            });
        }

        res.status(200).json({
            message: "Libro encontrado exitosamente",
            data: libro
        });
    } catch (error: any) {
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
}

export const CrearLibro = async (req: Request, res: Response) => {
    try {
        const libroRepository = AppDataSource.getRepository(Libros);
        const libro = libroRepository.create(req.body);

        await libroRepository.save(libro);

        res.status(201).json({
            message: "libro creado exitosamente",
            data: libro
        });
    } catch (error: any) {  
        
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
}

export const ActualizarLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const libroRepository = AppDataSource.getRepository(Libros);

        // Verificar si el libro existe
        const libroExistente = await libroRepository.findOne({ where: { Id: Number(id) } });

        if (!libroExistente) {
            return res.status(404).json({
                message: `Libro con id ${id} no encontrado`
            });
        }

        // Actualizar solo los campos específicos proporcionados en el cuerpo de la solicitud
        libroRepository.merge(libroExistente, req.body);

        // Guardar el usuario actualizado
        const libroActualizado = await libroRepository.save(libroExistente);

        // Verificar si se actualizó correctamente
        if (libroActualizado) {
            res.status(200).json({
                message: "Libro actualizado exitosamente",
                data: libroActualizado
            });
        } else {
            res.status(404).json({
                message: `Libro con id ${id} no encontrado después de la actualización`
            });
        }
    } catch (error: any) {
        console.error(error);

        const errorMessage = error instanceof Error ? error.message : "Error desconocido";

        res.status(500).json({
            message: "Error al actualizar el usuario",
            error: errorMessage
        });
    }
};


export const InactivarLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const libroRepository = AppDataSource.getRepository(Libros);

        // Verificar si el libro existe
        const libroExistente = await libroRepository.findOne({ where: { Id: Number(id) } });

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

        // Verificar si el estado actual del libro ya es 'Inactivo'
        if (libroExistente.Estado === 'Inactivo') {
            return res.status(400).json({
                message: "El libro ya se encuentra eliminado."
            });
        }

        // Actualizar el estado del usuario a 'Inactivo'
        libroExistente.Estado = req.body.Estado;

        // Guardar el libro con el estado actualizado
        const libroActualizado = await libroRepository.save(libroExistente);

        // Verificar si se actualizó correctamente
        if (libroActualizado) {
            res.status(200).json({
                message: "Libro eliminado exitosamente",
            });
        } else {
            res.status(404).json({
                message: `Libro con id ${id} no encontrado después de la actualización`
            });
        }
    } catch (error: any) {
        console.error(error);

        const errorMessage = error instanceof Error ? error.message : "Error desconocido";

        res.status(500).json({
            message: "Error al actualizar el libro",
            error: errorMessage
        });
    }
};