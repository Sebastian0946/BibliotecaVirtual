import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

enum TipoDocumento {
    CC = 'CC',
    TI = 'TI',
    CE = 'CE'
}

enum Estado {
    Activo = 'Activo',
    Inactivo = 'Inactivo',
}

@Entity({name:'Usuarios', schema:'seguridad'})
export class Usuarios extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    Id: number

    @Column({ type: 'enum', enum: TipoDocumento, nullable: false})
    TipoDocumento: TipoDocumento;

    @Column({ unique: true, nullable: false })
    Documento: string

    @Column({length: 45, nullable: false})
    Nombres: string

    @Column({length: 45, nullable: false})
    Apellidos: string

    @Column({length: 100, nullable: false})
    Direccion: string
    
    @Column({unique: true, nullable: false})
    Email: string

    @Column({unique: true, nullable: false})
    Telefono: string

    @Column({type: 'enum', enum: Estado, nullable: false, default: 'Activo'})
    Estado: Estado

    @CreateDateColumn()
    FechaCreacion: Date

    @UpdateDateColumn()
    FechaActualizacion: Date

}