import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SETTING_REPOSITORY } from 'src/core/constants';
import { Setting } from './settings.entity';
import { SettingDto } from './dto/setting.dto';
import { Account } from '../accounts/accounts.entity';

@Injectable()
export class SettingsService {
    constructor(@Inject(SETTING_REPOSITORY) private readonly settingRepository: typeof Setting) {}

    async create(setting: SettingDto): Promise<Setting> {
        return await this.settingRepository.create<Setting>({...setting})
    }

    async findAll(accountId: number): Promise<Setting[]> {
        return await this.settingRepository.findAll<Setting>({
            include: [{ model: Account}],
            where: {
                accountId,
            }
        });
    }

    async findOne(id: number, accountId: number): Promise<Setting> {
        const setting = await this.settingRepository.findOne({
            where: { id, accountId },
            include: [{ model: Account}],
        });
        if (!setting) {
            throw new NotFoundException('This Setting doesn\'t exist');
        }

        return setting;
    }

    async delete(id: number) {
        const deleted = await this.settingRepository.destroy({ where: { id } });

        if (deleted === 0) {
            throw new NotFoundException('This Setting doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }

    async update(id: number, data: SettingDto) {
        const [numberOfAffectedRows, [updatedSetting]] = await this.settingRepository.update({ ...data }, { where: { id }, returning: true });

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Setting doesn\'t exist');
        }
        return updatedSetting;
    }
}
