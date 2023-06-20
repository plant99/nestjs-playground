import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule,
  ConfigModule.forRoot({isGlobal: true}),
  AccountsModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
