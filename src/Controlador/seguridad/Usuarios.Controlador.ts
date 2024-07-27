import { Response, Request } from "express";
import { Usuarios } from "../../entidades/seguridad/Usuarios";
import { AppDataSource } from "../../db";

export const BuscarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarioRepository = AppDataSource.getRepository(Usuarios);
        const usuarios = await usuarioRepository.find();

        const columns = [
            { title: "Id", data: "Id" },
            { title: "Tipo Documento", data: "TipoDocumento" },
            { title: "Documento", data: "Documento" },
            { title: "Nombres", data: "Nombres" },
            { title: "Apellidos", data: "Apellidos" },
            { title: "Direccion", data: "Direccion" },
            { title: "Email", data: "Email" },
            { title: "Telefono", data: "Telefono" },
            { title: "Estado", data: "Estado" },

        ];

        res.status(200).json({
            draw: req.body.draw, // Mantiene la sincronización con DataTables
            recordsTotal: usuarios.length, // Número total de registros
            recordsFiltered: usuarios.length, // Número total de registros después de aplicar filtros (si los hubiera)
            data: usuarios, // Los datos de los usuarios que se mostrarán en la tabla
            columns: columns // Definición de las columnas
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
            message: "Error al buscar los usuarios",
            error: errorMessage,
            detail: errorDetail
        });
    }
}


export const BuscarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const usuarioRepository = AppDataSource.getRepository(Usuarios);
        const usuario = await usuarioRepository.findOne({ where: { Id: Number(id) } });

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json({
            message: "Usuario encontrado exitosamente",
            data: usuario
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
            message: "Error al buscar el usuario",
            error: errorMessage,
            detail: errorDetail
        });
    }
}

export const CrearUsuario = async (req: Request, res: Response) => {
    try {
        const usuarioRepository = AppDataSource.getRepository(Usuarios);
        const usuario = usuarioRepository.create(req.body);

        await usuarioRepository.save(usuario);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: usuario
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
            message: "Error al crear el usuario",
            error: errorMessage,
            detail: errorDetail
        });
    }
}

export const ActualizarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuarioRepository = AppDataSource.getRepository(Usuarios);

        // Verificar si el usuario existe
        const usuarioExistente = await usuarioRepository.findOne({ where: { Id: Number(id) } });

        if (!usuarioExistente) {
            return res.status(404).json({
                message: `Usuario con id ${id} no encontrado`
            });
        }

        // Actualizar solo los campos específicos proporcionados en el cuerpo de la solicitud
        usuarioRepository.merge(usuarioExistente, req.body);

        // Guardar el usuario actualizado
        const usuarioActualizado = await usuarioRepository.save(usuarioExistente);

        // Verificar si se actualizó correctamente
        if (usuarioActualizado) {
            res.status(200).json({
                message: "Usuario actualizado exitosamente",
                data: usuarioActualizado
            });
        } else {
            res.status(404).json({
                message: `Usuario con id ${id} no encontrado después de la actualización`
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


export const InactivarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuarioRepository = AppDataSource.getRepository(Usuarios);

        // Verificar si el usuario existe
        const usuarioExistente = await usuarioRepository.findOne({ where: { Id: Number(id) } });

        if (!usuarioExistente) {
            return res.status(404).json({
                message: `Usuario con id ${id} no encontrado`
            });
        }

        // Verificar si el estado enviado es 'Inactivo'
        if (req.body.Estado !== 'Inactivo') {
            return res.status(400).json({
                message: "Este usuario no se puede Inactivar. El estado debe ser 'Inactivo'."
            });
        }

        // Verificar si el estado actual del usuario ya es 'Inactivo'
        if (usuarioExistente.Estado === 'Inactivo') {
            return res.status(400).json({
                message: "El usuario ya se encuentra eliminado."
            });
        }

        // Actualizar el estado del usuario a 'Inactivo'
        usuarioExistente.Estado = req.body.Estado;

        // Guardar el usuario con el estado actualizado
        const usuarioActualizado = await usuarioRepository.save(usuarioExistente);

        // Verificar si se actualizó correctamente
        if (usuarioActualizado) {
            res.status(200).json({
                message: "Usuario eliminado exitosamente",
            });
        } else {
            res.status(404).json({
                message: `Usuario con id ${id} no encontrado después de la actualización`
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