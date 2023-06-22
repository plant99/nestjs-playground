import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidateValueDataTypePipe extends ValidationPipe {
    public async transform(data, metadata: ArgumentMetadata) {
        // At this point, it's made sure that dataType exists and in the list ["string", "number", "boolean"]
        const errorString = "value is not of the type dataType";
        if (data["dataType"] in ["string", "number"]) {
            if (typeof (data["value"]) != data["dataType"]) {
                throw new BadRequestException(errorString);
            }
        }

        // check if 'derived' data type is boolean, or if it's a string it's among 'true' and 'false'
        if (data["dataType"] === "boolean") {
            if(typeof (data["value"]) != "boolean" && String(data["value"]) != "true" && String(data["value"]) != "false") {
                throw new BadRequestException(errorString);
            }
        }
        return data
    }
}