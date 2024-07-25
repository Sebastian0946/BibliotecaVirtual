import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";


enum Estado {
    Activo = 'Activo',
    Inactivo = 'Inactivo',
}

@Entity({name:'Libros', schema:'sistema'})
export class Libros extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    Id: number

    @Column({ unique: true, nullable: false })
    ISBN: string

    @Column({length: 45, nullable: false})
    Autor: string

    @Column({length: 50, unique: true, nullable: false})
    Titulo: string

    @Column({length: 100, nullable: false})
    Editorial: string

    @Column({nullable: false})
    Copias: number
    
    @Column({unique: true, nullable: false})
    FechaPublicacion: string

    @Column({type: 'enum', enum: Estado, nullable: false, default: 'Activo'})
    Estado: Estado

    @CreateDateColumn()
    FechaCreacion: Date

    @UpdateDateColumn()
    FechaActualizacion: Date

}