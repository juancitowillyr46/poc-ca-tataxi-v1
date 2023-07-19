import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class AuditableEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // Audit
    @CreateDateColumn({ name: 'created_at',default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('int', {name: 'created_by', default: 1})
    createdBy: number;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column('int', {name: 'updated_by', nullable: true })
    updatedBy: number;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @Column('int', {name: 'deleted_by', nullable: true })
    deletedBy: number;

}