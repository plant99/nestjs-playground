import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class AccountDto {
    @IsNotEmpty()
    readonly name: string;
    readonly createAt: Date;
    readonly updateAt: Date;
    readonly deleteAt: Date;
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}