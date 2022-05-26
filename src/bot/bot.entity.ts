import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class botUser {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    public first_name: string;

    @Column({ type: 'varchar', length: 120 })
    public last_name: string;

    @Column({ type: 'varchar', length: 120 })
    public chat_id: string;

    @Column({ type: 'varchar', length: 120 })
    public email: string;


    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;

    constructor(partial: Partial<botUser>) {
        Object.assign(this, partial);
    }
}