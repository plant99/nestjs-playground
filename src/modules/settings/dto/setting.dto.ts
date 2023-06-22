import { IsNotEmpty, IsEnum } from 'class-validator';
enum SettingDataType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export class SettingDto {
    @IsNotEmpty()
    readonly name: string;

    readonly value: string;

    @IsNotEmpty()
    @IsEnum(SettingDataType, {
        message: 'dataType must be one of "string", "number" or "boolean"',
    })
    readonly dataType: SettingDataType;

    @IsNotEmpty()
    readonly accountId: number;
}