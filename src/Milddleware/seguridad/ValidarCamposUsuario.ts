import { Request, Response, NextFunction } from 'express';

export const validarCamposUsuario = (req: Request, res: Response, next: NextFunction) => {
    
    const { Documento, TipoDocumento, Nombres, Apellidos, Direccion, Email, Telefono } = req.body;

    const camposInvalidos: string[] = [];

    // Validación específica para PUT
    if (req.method === 'PUT') {

        const camposRequeridos = ['Documento', 'TipoDocumento', 'Nombres', 'Apellidos', 'Direccion', 'Email', 'Telefono'];

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

        if (!TipoDocumento) camposFaltantes.push('TipoDocumento');
        if (!Documento) camposFaltantes.push('Documento');
        if (!Nombres) camposFaltantes.push('Nombres');
        if (!Apellidos) camposFaltantes.push('Apellidos');
        if (!Direccion) camposFaltantes.push('Direccion');
        if (!Email) camposFaltantes.push('Email');
        if (!Telefono) camposFaltantes.push('Telefono');

        // Si hay campos faltantes en un POST, responder con un error 400
        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                message: `Los siguientes campos son obligatorios en un POST: ${camposFaltantes.join(', ')}`,
                data: req.body  
            });
        }
    }

    // Llama a la siguiente función de middleware o controlador si no hay errores
    next();
};