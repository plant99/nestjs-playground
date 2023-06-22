import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class AccountDto {
    @IsNotEmpty()
    readonly name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
