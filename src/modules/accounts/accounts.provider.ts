import { Account } from "./accounts.entity";
import { ACCOUNT_REPOSITORY } from "src/core/constants";

export const accountProviders = [{
    provide: ACCOUNT_REPOSITORY,
    useValue: Account,
}]