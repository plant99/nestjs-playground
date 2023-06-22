import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, UsePipes  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsValidAccountIDForRequest } from 'src/core/guards/isValidAccountIdForRequest';
import { SettingsService } from './settings.service';
import { Setting as SettingEntity } from './settings.entity';
import { SettingDto } from './dto/setting.dto';
import { DoesAccountExistId } from 'src/core/guards/doesAccountExist.guard';
import { ValidateValueDataTypePipe } from 'src/core/pipes/validatetypes.pipe';
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingService: SettingsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Request() req) {
        return this.settingService.findAll(req.user.id)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id: number, @Request() req): Promise<SettingEntity> {
        return this.settingService.findOne(id, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'), DoesAccountExistId, IsValidAccountIDForRequest)
    @UsePipes(ValidateValueDataTypePipe)
    @Post()
    async create(@Body() setting: SettingDto): Promise<SettingEntity> {
        return this.settingService.create(setting);
    }

    @UseGuards(AuthGuard('jwt'), DoesAccountExistId, IsValidAccountIDForRequest)
    @UsePipes(ValidateValueDataTypePipe)
    @Put(':id')
    async update(@Param('id') id: number, @Body() setting: SettingDto): Promise<SettingEntity> {
        return this.settingService.update(id, setting);

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.settingService.delete(id);
    }
}
