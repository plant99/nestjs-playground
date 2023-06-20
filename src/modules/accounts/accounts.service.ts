import { Injectable, Inject } from '@nestjs/common';
import { Account } from './accounts.entity';
import { AccountDto } from './dto/accounts.dto';
import { ACCOUNT_REPOSITORY } from '../../core/constants';

@Injectable()
export class AccountsService {

    constructor(@Inject(ACCOUNT_REPOSITORY) private readonly userRepository: typeof Account) { }

    async create(account: AccountDto): Promise<Account> {
        return await this.userRepository.create<Account>(account);
    }

    async findOneByName(name: string): Promise<Account> {
        return await this.userRepository.findOne<Account>({ where: { name } });
    }

    async findOneById(id: number): Promise<Account> {
        return await this.userRepository.findOne<Account>({ where: { id } });
    }
}