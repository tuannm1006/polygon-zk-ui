export interface IOption {
  code: string | number;
  label: string;
  disabled?: boolean;
  query: string;
}

export interface SBTOwnerCategory {
  value: string;
  label: string;
  colName: string;
  colTitle: string;
}

export interface ISbtOwnersCategory {
  [key: string]: SBTOwnerCategory;
}

export interface SocialAccount {
  id: string;
  userId: string;
  provider: string;
  providerId: string;
  url: string;
}
