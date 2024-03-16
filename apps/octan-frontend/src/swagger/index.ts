export * from './helpers';

export * from './generated-api';

export class User {
	id?: string;
	username?: string;
	email?: string;
	primaryWallet?: string;
	isVerifyEmail?: any;
  referralCode?: string;
}