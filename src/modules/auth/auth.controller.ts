import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccountDto } from '../accounts/dto/accounts.dto';
import { DoesAccountExistEmail } from 'src/core/guards/doesAccountExist.guard';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    @UseGuards(DoesAccountExistEmail)
    @Post('signup')
    async signUp(@Body() account: AccountDto) {
        return this.authService.create(account);
    }
}