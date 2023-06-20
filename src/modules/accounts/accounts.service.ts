import { Injectable, Inject } from '@nestjs/common';
import { Account } from './accounts.entity';
import { AccountDto } from './dto/accounts.dto';
import { ACCOUNT_REPOSITORY } from '../../core/constants';

@Injectable()
export class AccountsService {

    constructor(@Inject(ACCOUNT_REPOSITORY) private readonly accountRepository: typeof Account) { }

    async create(account: AccountDto): Promise<Account> {
        return await this.accountRepository.create<Account>(account);
    }

    async findOneByName(name: string): Promise<Account> {
        return await this.accountRepository.findOne<Account>({ where: { name } });
    }

    async findOneByEmail(email: string): Promise<Account> {
        return await this.accountRepository.findOne<Account>({ where: { email } });
    }

    async findOneById(id: number): Promise<Account> {
        return await this.accountRepository.findOne<Account>({ where: { id } });
    }
}