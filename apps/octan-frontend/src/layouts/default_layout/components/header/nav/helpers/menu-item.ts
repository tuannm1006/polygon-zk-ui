export type MenuItem = {
  id: string;
  text: string;
  title?: string;
  url: string;
  pattern?: string;
  isOpenAsNewTab: boolean;
  isInternalUrl: boolean;
  disabled?: boolean;
  loginRequired?: boolean;
  externalUrl?: string;
  dropDownMenu?: boolean;
};
