import { IsNotEmpty, IsEnum } from 'class-validator';
enum Types {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export class SettingDto {
    @IsNotEmpty()
    readonly name: string;

    readonly value: string;

    @IsNotEmpty()
    @IsEnum(Types, {
        message: 'dataType must be one of "string", "number" or "boolean"',
    })
    readonly dataType: string;

    @IsNotEmpty()
    readonly accountId: number;
}