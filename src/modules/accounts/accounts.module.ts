import { Module } from '@nestjs/common';
import {AccountsService} from './accounts.service';
import { accountProviders } from './accounts.provider';
@Module({
    providers: [AccountsService, ...accountProviders],
    exports: [AccountsService]
})
export class AccountsModule {}
