
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import UsuariosRouter from './routes/seguridad/Usuarios.Routes';
import LibrosRouter from './routes/sistema/Libros.Routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', UsuariosRouter, LibrosRouter);

export default app;