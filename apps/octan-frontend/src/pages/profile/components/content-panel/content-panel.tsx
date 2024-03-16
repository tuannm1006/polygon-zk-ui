import { DefaultFcProps } from 'common';

import { AccountSetting } from '../account-setting';
import { Kyc } from '../kyc';
import { MyReferral } from '../my-referral';
import { SocialProfile } from '../social-profile';
import { WalletManagement } from '../wallet-management';
import { SbtsManagement } from '../sbts-management';
import { ListWallet } from '../list-wallet';

export type ContentPanelProps = DefaultFcProps;

export const ContentPanel: React.FC<ContentPanelProps> = ({ className, slug }) => {
  const renderContent = () => {
    switch (slug) {
      case 'account-setting':
        return <AccountSetting isModal={false} />;
      case 'social-profile':
        return <SocialProfile />;
      case 'my-referral':
        return <MyReferral />;
      case 'kyc':
        return <Kyc />;
      case 'wallet-management':
        return <WalletManagement isModal={false} />;
      case 'sbts-management':
        return <SbtsManagement />;
      case 'list-wallet':
        return <ListWallet />;
      default:
        return <h1>Comming soon</h1>;
    }
  };

  return <div className={className}>{renderContent()}</div>;
};
