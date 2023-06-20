import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SettingsService } from './settings.service';
import { Setting as SettingEntity } from './settings.entity';
import { SettingDto } from './dto/setting.dto';
import { DoesAccountExistId } from 'src/core/guards/doesAccountExist.guard';
@Controller('settings')
export class SettingsController {
    constructor(private readonly settingService: SettingsService) {}

    @Get()
    async findAll() {
        return await this.settingService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SettingEntity> {
        const setting = await this.settingService.findOne(id);

        if (!setting) {
            throw new NotFoundException('This Setting doesn\'t exist');
        }

        return setting;
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(DoesAccountExistId)
    @Post()
    async create(@Body() setting: SettingDto, @Request() req): Promise<SettingEntity> {
        return await this.settingService.create(setting);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(DoesAccountExistId)
    @Put(':id')
    async update(@Param('id') id: number, @Body() setting: SettingDto, @Request() req): Promise<SettingEntity> {
        const { numberOfAffectedRows, updatedSetting } = await this.settingService.update(id, setting);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Setting doesn\'t exist');
        }
        return updatedSetting;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.settingService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Setting doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
