import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/modules/accounts/accounts.service';
@Injectable()
export class DoesAccountExist implements CanActivate {
    constructor(private readonly accountService: AccountsService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const accountExists = await this.accountService.findOneByEmail(request.body.email);
        if (accountExists) {
            throw new ForbiddenException('This email already exists');
        }
        return true;
    }
}
