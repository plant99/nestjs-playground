import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { settingsProviders } from './settings.providers';
@Module({
  providers: [SettingsService, ...settingsProviders],
  controllers: [SettingsController]
})
export class SettingsModule {}
