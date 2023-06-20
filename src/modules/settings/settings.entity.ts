import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Account } from '../accounts/accounts.entity';

@Table
export class Setting extends Model<Setting> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    value: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    dataType: string;

    @ForeignKey(() => Account)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    accountId: number;

    @BelongsTo(() => Account)
    account: Account;

    @Column({
        type: DataType.DATE
    })
    deletedAt: Date;
}