"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Usuarios_1 = require("./entidades/seguridad/Usuarios");
const Libros_1 = require("./entidades/sistema/Libros");
exports.AppDataSource = new typeorm_1.DataSource({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "0946",
    database: "BibliotecaVirtual",
    type: "postgres",
    entities: ["dist/**/*.entity.js", Usuarios_1.Usuarios, Libros_1.Libros],
    synchronize: true
});
