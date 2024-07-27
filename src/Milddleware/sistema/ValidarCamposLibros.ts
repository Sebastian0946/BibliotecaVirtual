import { Request, Response, NextFunction } from 'express';

export const validarCamposLibros = (req: Request, res: Response, next: NextFunction) => {
    
    const { ISBN, Autor, Copias, Titulo, Editorial, FechaPublicacion } = req.body;

    const camposInvalidos: string[] = [];

    // Validación específica para PUT
    if (req.method === 'PUT') {

        const camposRequeridos = ['ISBN', 'Autor', 'Copias', 'Titulo', 'Editorial', 'Editorial', 'FechaPublicacion'];

        camposRequeridos.forEach(campo => {
            // Verificar si el campo está presente en req.body y si su valor es nulo o vacío
            if (req.body.hasOwnProperty(campo) && (req.body[campo] === null || req.body[campo] === '')) {
                camposInvalidos.push(campo);
            }
        });
 
         // Si se encontraron campos inválidos en un PUT, responder con un error 400
        if (camposInvalidos.length > 0) {
            return res.status(400).json({
                message: `Los siguientes campos no pueden estar vacíos o nulos: ${camposInvalidos.join(', ')}`,
                data: req.body  
            });
        }
    }

    // Validación específica para POST
    if (req.method === 'POST') {
        const camposFaltantes: string[] = [];

        if (!ISBN) camposFaltantes.push('ISBN');
        if (!Autor) camposFaltantes.push('Autor');
        if (!Copias) camposFaltantes.push('Copias');
        if (!Editorial) camposFaltantes.push('Editorial');
        if (!FechaPublicacion) camposFaltantes.push('FechaPublicacion');
        if (!Titulo) camposFaltantes.push('Titulo');

        // Si hay campos faltantes en un POST, responder con un error 400
        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                message: `Los siguientes campos son obligatorios: ${camposFaltantes.join(', ')}`,
                data: req.body  
            });
        }
    }

    // Llama a la siguiente función de middleware o controlador si no hay errores
    next();
};