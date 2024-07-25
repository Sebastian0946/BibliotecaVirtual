"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
const typeorm_1 = require("typeorm");
var TipoDocumento;
(function (TipoDocumento) {
    TipoDocumento["CC"] = "CC";
    TipoDocumento["TI"] = "TI";
    TipoDocumento["CE"] = "CE";
})(TipoDocumento || (TipoDocumento = {}));
var Estado;
(function (Estado) {
    Estado["Activo"] = "Activo";
    Estado["Inactivo"] = "Inactivo";
})(Estado || (Estado = {}));
let Usuarios = class Usuarios extends typeorm_1.BaseEntity {
};
exports.Usuarios = Usuarios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuarios.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoDocumento, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "TipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "Documento", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "Nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "Apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "Direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "Telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Estado, nullable: false, default: 'Activo' }),
    __metadata("design:type", String)
], Usuarios.prototype, "Estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuarios.prototype, "FechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuarios.prototype, "FechaActualizacion", void 0);
exports.Usuarios = Usuarios = __decorate([
    (0, typeorm_1.Entity)({ name: 'Usuarios', schema: 'seguridad' })
], Usuarios);
