import { IsNotEmpty, MinLength } from 'class-validator';

export class SettingDto {
    @IsNotEmpty()
    readonly name: string;

    readonly value: string;

    @IsNotEmpty()
    readonly dataType: string;

    @IsNotEmpty()
    readonly accountId: number;
}