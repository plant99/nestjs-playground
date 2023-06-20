import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AccountsModule } from '../accounts/accounts.module';
import { SettingsController } from './settings.controller';
import { settingsProviders } from './settings.providers';
@Module({
  imports: [AccountsModule],
  providers: [SettingsService, ...settingsProviders],
  controllers: [SettingsController]
})
export class SettingsModule {}
