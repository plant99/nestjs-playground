import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/modules/accounts/accounts.service';
@Injectable()
export class IsValidAccountIDForRequest implements CanActivate {
    constructor(private readonly accountService: AccountsService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const validAccountIdForChange = request.body.accountId === request.user.id;
        if (!validAccountIdForChange) {
            throw new ForbiddenException('A logged in user can only change its own settings');
        }
        return true;
    }
}