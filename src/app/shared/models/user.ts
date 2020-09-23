import { I18nLang } from "./information";
import { ModelInterface } from "./entity";

export const enum UserPlatformRole {
  CUSTOMER = 0,
  ADMIN = 1
}

export interface User extends ModelInterface<number> {
  firstName: string;
  lastName: string;
  lang: I18nLang;
  role: UserPlatformRole;
  accountName: string;
  resetKey: string;
  server: {
    blockchain: {
        rpc: string
    },
    contractVoteCypher: string,
    contractsAbi: {
      Meeting: string
    }
  };
}
