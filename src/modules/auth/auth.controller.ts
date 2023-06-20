import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccountDto } from '../accounts/dto/accounts.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signup')
    async signUp(@Body() account: AccountDto) {
        return await this.authService.create(account);
    }
}