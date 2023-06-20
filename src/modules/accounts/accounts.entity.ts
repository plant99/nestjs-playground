import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';

@Table

export class Account extends Model<Account> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.DATE
    })
    deletedAt: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}