import { DataSource } from "typeorm";
import { Usuarios } from "./entidades/seguridad/Usuarios";
import { Libros } from "./entidades/sistema/Libros";

export const AppDataSource = new DataSource({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "0946",
    database: "BibliotecaVirtual",
    type: "postgres",
    entities: ["dist/**/*.entity.js", Usuarios, Libros],
    synchronize: true
});