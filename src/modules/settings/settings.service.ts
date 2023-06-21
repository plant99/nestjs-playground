import { Injectable, Inject } from '@nestjs/common';
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

    async findAll(): Promise<Setting[]> {
        return await this.settingRepository.findAll<Setting>({
        	include: [{ model: Account, attributes: { exclude: ['password'] } }],
    	});
    }

    async findOne(id: number): Promise<Setting> {
        return await this.settingRepository.findOne({
        	where: { id },
        	include: [{ model: Account, attributes: { exclude: ['password'] } }],
    	});
    }

    async delete(id: number) {
        return await this.settingRepository.destroy({ where: { id } });
    }

    async update(id: number, data: SettingDto) {
        const [numberOfAffectedRows, [updatedSetting]] = await this.settingRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedSetting };
    }
}
