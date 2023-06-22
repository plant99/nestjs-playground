import { Table, Column, Model, DataType, Scopes } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Scopes(() => ({
    withoutPassword: {
        attributes: { exclude: ['password'] }
    }
}))
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
    createdAt: Date;

    @Column({
        type: DataType.DATE
    })
    updatedAt: Date;

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
        set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash)
        }
    })
    password: string;

    async comparePassword(inputPassword: string) {
        const match = await bcrypt.compare(inputPassword, this.password);
        return match;
    }
}