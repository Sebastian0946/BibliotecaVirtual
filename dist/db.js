"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Usuarios_1 = require("./entidades/seguridad/Usuarios");
const Libros_1 = require("./entidades/sistema/Libros");
const config_1 = require("./config");
exports.AppDataSource = new typeorm_1.DataSource({
    url: config_1.DATABASE_URL,
    type: "postgres",
    entities: ["dist/**/*.entity.js", Usuarios_1.Usuarios, Libros_1.Libros],
    synchronize: true
});
