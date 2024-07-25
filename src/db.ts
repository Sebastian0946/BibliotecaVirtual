import { DataSource } from "typeorm";
import { Usuarios } from "./entidades/seguridad/Usuarios";
import { Libros } from "./entidades/sistema/Libros";

import { DATABASE_URL } from './config';


export const AppDataSource = new DataSource({
    url: DATABASE_URL,
    type: "postgres",
    entities: ["dist/**/*.entity.js", Usuarios, Libros],
    synchronize: true
});