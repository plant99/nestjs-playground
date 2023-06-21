import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
@Injectable()
export class AuthService {
    constructor(private readonly accountsService: AccountsService, private readonly jwtService: JwtService,) { }

    async validateAccount(email: string, pass: string) {
        // find if user exist with this email
        const account = await this.accountsService.findOneByEmail(email);
        if (!account) {
            return null;
        }

        // find if user password match
        const match = await account.comparePassword(pass);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = account['dataValues'];
        return result;
    }

    public async login(account) {
        const token = await this.generateToken(account);
        return { account, token };
    }

    public async create(account) {
        const newAccount = await this.accountsService.create(account);

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newAccount.get({plain: true});

        // generate token
        const token = await this.generateToken(result);

        return { account: result, token };
    }

    private async generateToken(account) {
        const token = await this.jwtService.signAsync(account);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}