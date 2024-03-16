import { DefaultFcProps } from 'common';
import { FC, useMemo, useState, useRef, useEffect } from 'react';
import { useAppContext } from 'contexts';
import { formatAddress } from 'utils';
import { ArrowPopover, AvatarDefault, MenuIcon, NotificationMenu } from 'shared-components';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { copyToClipboard } from 'utils';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { HtmlTooltip } from 'shared-components';
import { InformationIcon, CopyIcon } from '../../../../../../pages/profile/components/my-referral';
import { getApiConfig } from 'swagger';
import { toJson } from '@octan/common';

export type UserMenuProps = DefaultFcProps;

export const QuickAccessItem: FC<DefaultFcProps> = ({ url, icon, iconDisable, onClick, title, disable }) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <>
      {url ? (
        !disable ? (
          <NavLink to={url} title={title}>
            <div className="quick-access-item flex flex-row items-center">
              <div className="icon">{icon}</div>
              <div className="menu">{title}</div>
            </div>
          </NavLink>
        ) : (
          <div className="quick-access-item flex flex-row items-center !cursor-default">
            <div className="icon">{iconDisable}</div>
            <HtmlTooltip title="Coming soon" arrow={true} placement="right">
              <div className="menu !text-[#cecece]">{title}</div>
            </HtmlTooltip>
          </div>
        )
      ) : (
        <div className="quick-access-item flex flex-row items-center" onClick={handleOnClick}>
          <div className="icon">{icon}</div>
          <div className="menu">{title}</div>
        </div>
      )}
    </>
  );
};

interface IReferral {
  referralCode?: string;
  referrals?: number;
}

export const UserMenu: FC<UserMenuProps> = (props) => {
  const { userInfo, userAddress, signOut, loggedIn, hasSBT } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [copyAddress, setCopyAddress] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [referralsDetail, setReferralsDetail] = useState<IReferral>({});
  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  useEffect(() => {
    const getReferralsDetail = async () => {
      const { basePath, ...options } = getApiConfig();

      const result = await fetch(`${basePath}/referrals/details`, {
        ...options,
        method: 'GET',
      }).then(toJson);

      setReferralsDetail(result);
    };

    if (userAddress) {
      getReferralsDetail();
    }
  }, [userAddress]);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDisconnect = (redirectToHomePage = false) => {
    handleClose();
    const url = new URL(window.location.href);
    const pathName = url.pathname;
    if (
      pathName === '/profile/account-setting' ||
      pathName === '/profile/wallet-management' ||
      pathName === '/profile/sbts-management' ||
      pathName === '/profile/my-referral' ||
      pathName === '/1-id'
    ) {
      url.pathname = '/1-id';
    } else {
      url.pathname = '';
    }
    document.location.href = url.toString();
    signOut();
  };

  const handleMouse = () => {
    setIsHovered(!isHovered);
  };

  const handleTooltipAddressClose = () => {
    setCopyAddress(false);
  };

  const handleTooltipAddressOpen = (item: any) => {
    copyToClipboard(item || '');
    setCopyAddress(true);
  };

  const handleTooltipReferalClose = () => {
    setCopySuccess(false);
  };

  const handleTooltipReferalOpen = (item: any) => {
    copyToClipboard(item || '');
    setCopySuccess(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCopySuccess(false);
      setCopyAddress(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [copySuccess, copyAddress]);

  const [username, email] = useMemo(() => [userInfo?.username || '-', userInfo?.email || '-'], [userInfo]);

  const quickAccessMenus = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#F7FFEC" />
          <path
            d="M11.2383 27.5C12.5637 25.2892 15.4686 23.7762 20.0006 23.7762C24.5326 23.7762 27.4374 25.2892 28.7628 27.5M23.6006 16.1C23.6006 18.0882 21.9888 19.7 20.0006 19.7C18.0123 19.7 16.4006 18.0882 16.4006 16.1C16.4006 14.1118 18.0123 12.5 20.0006 12.5C21.9888 12.5 23.6006 14.1118 23.6006 16.1Z"
            stroke="#0DB774"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      iconDisable: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#fff" />
          <path
            d="M11.2383 27.5C12.5637 25.2892 15.4686 23.7762 20.0006 23.7762C24.5326 23.7762 27.4374 25.2892 28.7628 27.5M23.6006 16.1C23.6006 18.0882 21.9888 19.7 20.0006 19.7C18.0123 19.7 16.4006 18.0882 16.4006 16.1C16.4006 14.1118 18.0123 12.5 20.0006 12.5C21.9888 12.5 23.6006 14.1118 23.6006 16.1Z"
            stroke="#cecece"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: 'Profile',
      url: 'profile/account-setting',
      disable: false,
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#F7FFEC" />
          <path
            d="M10.3984 15.54L10.4031 27.9C10.4031 29.3139 11.5493 30.46 12.9631 30.46H27.0431C28.457 30.46 29.6031 29.3139 29.6031 27.9V17.66C29.6031 16.4818 28.648 15.5267 27.4698 15.5267H10.4173C10.4088 15.5267 10.4012 15.5321 10.3984 15.54ZM10.3984 15.54C10.3992 15.3004 24.8031 9.54004 24.8031 9.54004V14.94M24.4998 22.7633L24.4831 22.78"
            stroke="#0DB774"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconDisable: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#fff" />
          <path
            d="M10.3984 15.54L10.4031 27.9C10.4031 29.3139 11.5493 30.46 12.9631 30.46H27.0431C28.457 30.46 29.6031 29.3139 29.6031 27.9V17.66C29.6031 16.4818 28.648 15.5267 27.4698 15.5267H10.4173C10.4088 15.5267 10.4012 15.5321 10.3984 15.54ZM10.3984 15.54C10.3992 15.3004 24.8031 9.54004 24.8031 9.54004V14.94M24.4998 22.7633L24.4831 22.78"
            stroke="#cecece"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Wallet management',
      url: 'profile/wallet-management',
      disable: false,
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#F7FFEC" />
          <path
            d="M15.4471 28.19C14.9231 28.3646 14.6399 28.9309 14.8146 29.4549C14.9892 29.9788 15.5556 30.262 16.0795 30.0873L15.4471 28.19ZM21.9941 29.554L21.9033 28.5582L21.9941 29.554ZM25.7325 28.7233L26.1711 29.622L25.7325 28.7233ZM29.3047 25.4737L28.5276 24.8443L28.5276 24.8443L29.3047 25.4737ZM26.8615 23.4404L27.5686 24.1475L26.8615 23.4404ZM25.2163 25.0856L25.9234 25.7927L25.2163 25.0856ZM20.7479 24.8156C20.1956 24.8156 19.7479 25.2633 19.7479 25.8156C19.7479 26.3679 20.1956 26.8156 20.7479 26.8156V24.8156ZM28.9248 23.2361L28.3701 24.0682L28.9248 23.2361ZM17.0277 22.6911L17.4749 23.5855L17.4749 23.5855L17.0277 22.6911ZM21.4992 22.282L21.7624 21.3173L21.4992 22.282ZM23.2454 22.7583L22.9823 23.723L23.2454 22.7583ZM23.7987 24.8417L23.0916 24.1346L23.7987 24.8417ZM22.1177 25.1085C21.7272 25.499 21.7272 26.1322 22.1177 26.5227C22.5082 26.9132 23.1414 26.9132 23.5319 26.5227L22.1177 25.1085ZM16.0795 30.0873C16.1963 30.0484 16.4476 30.0202 16.8994 30.0524C17.3307 30.0832 17.8346 30.1587 18.412 30.2494C19.5078 30.4215 20.8949 30.6583 22.0848 30.5499L21.9033 28.5582C21.0163 28.639 19.911 28.4604 18.7223 28.2736C18.1573 28.1849 17.5709 28.0952 17.0416 28.0575C16.5328 28.0212 15.9534 28.0212 15.4471 28.19L16.0795 30.0873ZM22.0848 30.5499C22.8487 30.4803 23.5009 30.4472 24.1017 30.3385C24.753 30.2206 25.3637 30.016 26.1711 29.622L25.2939 27.8246C24.6146 28.1561 24.1798 28.2918 23.7455 28.3704C23.2605 28.4582 22.7869 28.4777 21.9033 28.5582L22.0848 30.5499ZM26.1711 29.622C26.9545 29.2396 27.7101 28.6232 28.3592 27.9995C29.018 27.3666 29.6161 26.6781 30.0818 26.1031L28.5276 24.8443C28.0931 25.3807 27.5523 26.0013 26.9735 26.5573C26.3851 27.1227 25.8047 27.5753 25.2939 27.8246L26.1711 29.622ZM26.1544 22.7333L24.5092 24.3785L25.9234 25.7927L27.5686 24.1475L26.1544 22.7333ZM23.454 24.8156H20.7479V26.8156H23.454V24.8156ZM24.5092 24.3785C24.2294 24.6584 23.8498 24.8156 23.454 24.8156V26.8156C24.3802 26.8156 25.2685 26.4476 25.9234 25.7927L24.5092 24.3785ZM29.4795 22.4041C28.4344 21.7073 27.0426 21.8451 26.1544 22.7333L27.5686 24.1475C27.7827 23.9334 28.1182 23.9002 28.3701 24.0682L29.4795 22.4041ZM30.0818 26.1031C31.0545 24.902 30.6882 23.2098 29.4795 22.4041L28.3701 24.0682C28.677 24.2727 28.7012 24.6299 28.5276 24.8443L30.0818 26.1031ZM11.1941 22.6617H14.5171V20.6617H11.1941V22.6617ZM14.3479 22.4925V29.9694H16.3479V22.4925H14.3479ZM14.5171 29.8002H11.1941V31.8002H14.5171V29.8002ZM11.3633 29.9694V22.4925H9.36328V29.9694H11.3633ZM11.1941 29.8002C11.2875 29.8002 11.3633 29.876 11.3633 29.9694H9.36328C9.36328 30.9805 10.1829 31.8002 11.1941 31.8002V29.8002ZM14.3479 29.9694C14.3479 29.876 14.4237 29.8002 14.5171 29.8002V31.8002C15.5282 31.8002 16.3479 30.9805 16.3479 29.9694H14.3479ZM14.5171 22.6617C14.4237 22.6617 14.3479 22.586 14.3479 22.4925H16.3479C16.3479 21.4814 15.5282 20.6617 14.5171 20.6617V22.6617ZM11.1941 20.6617C10.1829 20.6617 9.36328 21.4814 9.36328 22.4925H11.3633C11.3633 22.586 11.2875 22.6617 11.1941 22.6617V20.6617ZM16.2105 24.2177L17.4749 23.5855L16.5805 21.7966L15.3161 22.4288L16.2105 24.2177ZM19.6284 23.0771H19.9691V21.0771H19.6284V23.0771ZM21.2361 23.2468L22.9823 23.723L23.5086 21.7935L21.7624 21.3173L21.2361 23.2468ZM23.0916 24.1346L22.1177 25.1085L23.5319 26.5227L24.5058 25.5488L23.0916 24.1346ZM22.9823 23.723C23.1647 23.7728 23.2253 24.0009 23.0916 24.1346L24.5058 25.5488C25.7253 24.3293 25.1724 22.2473 23.5086 21.7935L22.9823 23.723ZM19.9691 23.0771C20.3971 23.0771 20.8232 23.1342 21.2361 23.2468L21.7624 21.3173C21.1779 21.1579 20.5749 21.0771 19.9691 21.0771V23.0771ZM17.4749 23.5855C18.1436 23.2512 18.8809 23.0771 19.6284 23.0771V21.0771C18.5704 21.0771 17.5268 21.3235 16.5805 21.7966L17.4749 23.5855ZM25.1479 15.8463C25.1479 17.1293 24.1078 18.1694 22.8248 18.1694V20.1694C25.2124 20.1694 27.1479 18.2339 27.1479 15.8463H25.1479ZM22.8248 18.1694C21.5418 18.1694 20.5017 17.1293 20.5017 15.8463H18.5017C18.5017 18.2339 20.4373 20.1694 22.8248 20.1694V18.1694ZM20.5017 15.8463C20.5017 14.5633 21.5418 13.5233 22.8248 13.5233V11.5233C20.4373 11.5233 18.5017 13.4588 18.5017 15.8463H20.5017ZM22.8248 13.5233C24.1078 13.5233 25.1479 14.5633 25.1479 15.8463H27.1479C27.1479 13.4588 25.2124 11.5233 22.8248 11.5233V13.5233ZM19.5017 14.8463C18.2187 14.8463 17.1787 13.8063 17.1787 12.5233H15.1787C15.1787 14.9108 17.1142 16.8463 19.5017 16.8463V14.8463ZM17.1787 12.5233C17.1787 11.2403 18.2187 10.2002 19.5017 10.2002V8.2002C17.1142 8.2002 15.1787 10.1357 15.1787 12.5233H17.1787ZM19.5017 10.2002C20.7847 10.2002 21.8248 11.2403 21.8248 12.5233H23.8248C23.8248 10.1357 21.8893 8.2002 19.5017 8.2002V10.2002Z"
            fill="#0DB774"
          />
        </svg>
      ),
      iconDisable: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#fff" />
          <path
            d="M15.4471 28.19C14.9231 28.3646 14.6399 28.9309 14.8146 29.4549C14.9892 29.9788 15.5556 30.262 16.0795 30.0873L15.4471 28.19ZM21.9941 29.554L21.9033 28.5582L21.9941 29.554ZM25.7325 28.7233L26.1711 29.622L25.7325 28.7233ZM29.3047 25.4737L28.5276 24.8443L28.5276 24.8443L29.3047 25.4737ZM26.8615 23.4404L27.5686 24.1475L26.8615 23.4404ZM25.2163 25.0856L25.9234 25.7927L25.2163 25.0856ZM20.7479 24.8156C20.1956 24.8156 19.7479 25.2633 19.7479 25.8156C19.7479 26.3679 20.1956 26.8156 20.7479 26.8156V24.8156ZM28.9248 23.2361L28.3701 24.0682L28.9248 23.2361ZM17.0277 22.6911L17.4749 23.5855L17.4749 23.5855L17.0277 22.6911ZM21.4992 22.282L21.7624 21.3173L21.4992 22.282ZM23.2454 22.7583L22.9823 23.723L23.2454 22.7583ZM23.7987 24.8417L23.0916 24.1346L23.7987 24.8417ZM22.1177 25.1085C21.7272 25.499 21.7272 26.1322 22.1177 26.5227C22.5082 26.9132 23.1414 26.9132 23.5319 26.5227L22.1177 25.1085ZM16.0795 30.0873C16.1963 30.0484 16.4476 30.0202 16.8994 30.0524C17.3307 30.0832 17.8346 30.1587 18.412 30.2494C19.5078 30.4215 20.8949 30.6583 22.0848 30.5499L21.9033 28.5582C21.0163 28.639 19.911 28.4604 18.7223 28.2736C18.1573 28.1849 17.5709 28.0952 17.0416 28.0575C16.5328 28.0212 15.9534 28.0212 15.4471 28.19L16.0795 30.0873ZM22.0848 30.5499C22.8487 30.4803 23.5009 30.4472 24.1017 30.3385C24.753 30.2206 25.3637 30.016 26.1711 29.622L25.2939 27.8246C24.6146 28.1561 24.1798 28.2918 23.7455 28.3704C23.2605 28.4582 22.7869 28.4777 21.9033 28.5582L22.0848 30.5499ZM26.1711 29.622C26.9545 29.2396 27.7101 28.6232 28.3592 27.9995C29.018 27.3666 29.6161 26.6781 30.0818 26.1031L28.5276 24.8443C28.0931 25.3807 27.5523 26.0013 26.9735 26.5573C26.3851 27.1227 25.8047 27.5753 25.2939 27.8246L26.1711 29.622ZM26.1544 22.7333L24.5092 24.3785L25.9234 25.7927L27.5686 24.1475L26.1544 22.7333ZM23.454 24.8156H20.7479V26.8156H23.454V24.8156ZM24.5092 24.3785C24.2294 24.6584 23.8498 24.8156 23.454 24.8156V26.8156C24.3802 26.8156 25.2685 26.4476 25.9234 25.7927L24.5092 24.3785ZM29.4795 22.4041C28.4344 21.7073 27.0426 21.8451 26.1544 22.7333L27.5686 24.1475C27.7827 23.9334 28.1182 23.9002 28.3701 24.0682L29.4795 22.4041ZM30.0818 26.1031C31.0545 24.902 30.6882 23.2098 29.4795 22.4041L28.3701 24.0682C28.677 24.2727 28.7012 24.6299 28.5276 24.8443L30.0818 26.1031ZM11.1941 22.6617H14.5171V20.6617H11.1941V22.6617ZM14.3479 22.4925V29.9694H16.3479V22.4925H14.3479ZM14.5171 29.8002H11.1941V31.8002H14.5171V29.8002ZM11.3633 29.9694V22.4925H9.36328V29.9694H11.3633ZM11.1941 29.8002C11.2875 29.8002 11.3633 29.876 11.3633 29.9694H9.36328C9.36328 30.9805 10.1829 31.8002 11.1941 31.8002V29.8002ZM14.3479 29.9694C14.3479 29.876 14.4237 29.8002 14.5171 29.8002V31.8002C15.5282 31.8002 16.3479 30.9805 16.3479 29.9694H14.3479ZM14.5171 22.6617C14.4237 22.6617 14.3479 22.586 14.3479 22.4925H16.3479C16.3479 21.4814 15.5282 20.6617 14.5171 20.6617V22.6617ZM11.1941 20.6617C10.1829 20.6617 9.36328 21.4814 9.36328 22.4925H11.3633C11.3633 22.586 11.2875 22.6617 11.1941 22.6617V20.6617ZM16.2105 24.2177L17.4749 23.5855L16.5805 21.7966L15.3161 22.4288L16.2105 24.2177ZM19.6284 23.0771H19.9691V21.0771H19.6284V23.0771ZM21.2361 23.2468L22.9823 23.723L23.5086 21.7935L21.7624 21.3173L21.2361 23.2468ZM23.0916 24.1346L22.1177 25.1085L23.5319 26.5227L24.5058 25.5488L23.0916 24.1346ZM22.9823 23.723C23.1647 23.7728 23.2253 24.0009 23.0916 24.1346L24.5058 25.5488C25.7253 24.3293 25.1724 22.2473 23.5086 21.7935L22.9823 23.723ZM19.9691 23.0771C20.3971 23.0771 20.8232 23.1342 21.2361 23.2468L21.7624 21.3173C21.1779 21.1579 20.5749 21.0771 19.9691 21.0771V23.0771ZM17.4749 23.5855C18.1436 23.2512 18.8809 23.0771 19.6284 23.0771V21.0771C18.5704 21.0771 17.5268 21.3235 16.5805 21.7966L17.4749 23.5855ZM25.1479 15.8463C25.1479 17.1293 24.1078 18.1694 22.8248 18.1694V20.1694C25.2124 20.1694 27.1479 18.2339 27.1479 15.8463H25.1479ZM22.8248 18.1694C21.5418 18.1694 20.5017 17.1293 20.5017 15.8463H18.5017C18.5017 18.2339 20.4373 20.1694 22.8248 20.1694V18.1694ZM20.5017 15.8463C20.5017 14.5633 21.5418 13.5233 22.8248 13.5233V11.5233C20.4373 11.5233 18.5017 13.4588 18.5017 15.8463H20.5017ZM22.8248 13.5233C24.1078 13.5233 25.1479 14.5633 25.1479 15.8463H27.1479C27.1479 13.4588 25.2124 11.5233 22.8248 11.5233V13.5233ZM19.5017 14.8463C18.2187 14.8463 17.1787 13.8063 17.1787 12.5233H15.1787C15.1787 14.9108 17.1142 16.8463 19.5017 16.8463V14.8463ZM17.1787 12.5233C17.1787 11.2403 18.2187 10.2002 19.5017 10.2002V8.2002C17.1142 8.2002 15.1787 10.1357 15.1787 12.5233H17.1787ZM19.5017 10.2002C20.7847 10.2002 21.8248 11.2403 21.8248 12.5233H23.8248C23.8248 10.1357 21.8893 8.2002 19.5017 8.2002V10.2002Z"
            fill="#cecece"
          />
        </svg>
      ),
      title: 'SBT management',
      url: 'profile/sbts-management',
      disable: false,
    },
    // {
    //   icon: (
    //     <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <rect width="40" height="40" rx="20" fill="#F7FFEC" />
    //       <path
    //         d="M16.756 12.2555L18.0271 10.4288C18.214 10.1602 18.5206 10 18.8479 10H20.653C20.9791 10 21.2847 10.159 21.4719 10.426L22.7297 12.2203M16.756 12.2555C16.4092 12.7503 15.8326 12.9928 15.2207 12.9496M16.756 12.2555C16.4075 12.7491 15.8326 12.9948 15.2207 12.9496M15.2207 12.9496L12.9716 12.8084C12.6507 12.7882 12.3398 12.9236 12.1358 13.1721L10.9953 14.5621C10.7791 14.8256 10.712 15.181 10.8173 15.5052L11.4731 17.525M11.4731 17.525C11.5621 17.8134 11.5735 18.1223 11.5098 18.414M11.4731 17.525C11.5633 17.8129 11.5743 18.1211 11.5094 18.417M11.5098 18.414C11.4453 18.7023 11.3071 18.9745 11.1019 19.1949M11.5098 18.414L11.5094 18.417M11.1019 19.1949L9.61575 20.7933C9.38735 21.0389 9.29732 21.3827 9.376 21.7088L9.77856 23.377C9.85699 23.702 10.0926 23.9663 10.4065 24.0813L12.4484 24.8297C12.7333 24.9399 12.9794 25.1191 13.1657 25.3449M11.1019 19.1949C11.3084 18.9763 11.4453 18.705 11.5094 18.417M13.1657 25.3449C13.3507 25.5713 13.4767 25.8445 13.5256 26.1404M13.1657 25.3449C13.3524 25.5713 13.4788 25.8438 13.5256 26.1404M13.1657 25.3449L13.1627 25.3416C13.1505 25.3268 13.1375 25.3114 13.1248 25.297M13.5256 26.1404L13.8733 28.2759C13.9265 28.6031 14.1385 28.8827 14.4392 29.0223L16.0671 29.7781C16.3582 29.9132 16.6964 29.9005 16.9765 29.7438L18.8902 28.6731M18.8902 28.6731C19.1553 28.5242 19.4512 28.4495 19.747 28.4491M18.8902 28.6731C18.9952 28.6134 19.1052 28.5657 19.2181 28.5299C19.3897 28.4756 19.5684 28.4488 19.747 28.4491M19.747 28.4491C19.9009 28.4495 20.0547 28.4698 20.2047 28.51C20.3442 28.5474 20.48 28.6018 20.6085 28.6731M19.747 28.4491C20.0442 28.4487 20.3417 28.5234 20.6085 28.6731M20.6085 28.6731L22.612 29.7576C22.8932 29.9099 23.2304 29.9185 23.519 29.7806L25.1391 29.0068C25.4387 28.8637 25.6478 28.5812 25.6971 28.2529L26.0085 26.178M26.0085 26.178C26.0553 25.8805 26.1796 25.6052 26.3642 25.3768M26.0085 26.178C26.0536 25.8798 26.1788 25.6049 26.3642 25.3768M26.3642 25.3768C26.5476 25.1508 26.7907 24.9707 27.074 24.8593M26.3642 25.3768C26.5471 25.1499 26.7895 24.9693 27.074 24.8593M27.074 24.8593L29.1369 24.0508C29.4449 23.9301 29.6733 23.6649 29.7469 23.3425L30.1326 21.6539C30.2061 21.3323 30.1162 20.9952 29.8924 20.7528L28.3973 19.134M28.3973 19.134C28.1883 18.9128 28.0424 18.6485 27.9716 18.3677M28.3973 19.134C28.2991 19.0307 28.2148 18.9177 28.1461 18.798C28.0677 18.662 28.0092 18.5173 27.9716 18.3677M27.9716 18.3677C27.9021 18.0889 27.9063 17.7935 27.9944 17.5075L28.641 15.4349C28.7414 15.1131 28.6729 14.7623 28.4588 14.502L27.3464 13.1489C27.1401 12.8981 26.8249 12.763 26.5009 12.7867L24.2776 12.9496M24.2776 12.9496C23.9733 12.971 23.6741 12.9131 23.4078 12.7884M24.2776 12.9496C23.9729 12.9723 23.6741 12.9139 23.4078 12.7884M23.4078 12.7884C23.1397 12.6621 22.9046 12.4679 22.7297 12.2203M23.4078 12.7884C23.1393 12.6626 22.9037 12.4689 22.7297 12.2203M11.5094 18.417L11.5102 18.4126M23.1359 20.0106C23.1359 21.8756 21.59 23.3874 19.6834 23.3874C17.7768 23.3874 16.2309 21.8756 16.2309 20.0106C16.2309 18.1457 17.7768 16.6339 19.6834 16.6339C21.59 16.6339 23.1359 18.1457 23.1359 20.0106Z"
    //         stroke="#0DB774"
    //         strokeWidth="2"
    //       />
    //     </svg>
    //   ),
    //   iconDisable: (
    //     <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <rect width="40" height="40" rx="20" fill="#fff" />
    //       <path
    //         d="M16.756 12.2555L18.0271 10.4288C18.214 10.1602 18.5206 10 18.8479 10H20.653C20.9791 10 21.2847 10.159 21.4719 10.426L22.7297 12.2203M16.756 12.2555C16.4092 12.7503 15.8326 12.9928 15.2207 12.9496M16.756 12.2555C16.4075 12.7491 15.8326 12.9948 15.2207 12.9496M15.2207 12.9496L12.9716 12.8084C12.6507 12.7882 12.3398 12.9236 12.1358 13.1721L10.9953 14.5621C10.7791 14.8256 10.712 15.181 10.8173 15.5052L11.4731 17.525M11.4731 17.525C11.5621 17.8134 11.5735 18.1223 11.5098 18.414M11.4731 17.525C11.5633 17.8129 11.5743 18.1211 11.5094 18.417M11.5098 18.414C11.4453 18.7023 11.3071 18.9745 11.1019 19.1949M11.5098 18.414L11.5094 18.417M11.1019 19.1949L9.61575 20.7933C9.38735 21.0389 9.29732 21.3827 9.376 21.7088L9.77856 23.377C9.85699 23.702 10.0926 23.9663 10.4065 24.0813L12.4484 24.8297C12.7333 24.9399 12.9794 25.1191 13.1657 25.3449M11.1019 19.1949C11.3084 18.9763 11.4453 18.705 11.5094 18.417M13.1657 25.3449C13.3507 25.5713 13.4767 25.8445 13.5256 26.1404M13.1657 25.3449C13.3524 25.5713 13.4788 25.8438 13.5256 26.1404M13.1657 25.3449L13.1627 25.3416C13.1505 25.3268 13.1375 25.3114 13.1248 25.297M13.5256 26.1404L13.8733 28.2759C13.9265 28.6031 14.1385 28.8827 14.4392 29.0223L16.0671 29.7781C16.3582 29.9132 16.6964 29.9005 16.9765 29.7438L18.8902 28.6731M18.8902 28.6731C19.1553 28.5242 19.4512 28.4495 19.747 28.4491M18.8902 28.6731C18.9952 28.6134 19.1052 28.5657 19.2181 28.5299C19.3897 28.4756 19.5684 28.4488 19.747 28.4491M19.747 28.4491C19.9009 28.4495 20.0547 28.4698 20.2047 28.51C20.3442 28.5474 20.48 28.6018 20.6085 28.6731M19.747 28.4491C20.0442 28.4487 20.3417 28.5234 20.6085 28.6731M20.6085 28.6731L22.612 29.7576C22.8932 29.9099 23.2304 29.9185 23.519 29.7806L25.1391 29.0068C25.4387 28.8637 25.6478 28.5812 25.6971 28.2529L26.0085 26.178M26.0085 26.178C26.0553 25.8805 26.1796 25.6052 26.3642 25.3768M26.0085 26.178C26.0536 25.8798 26.1788 25.6049 26.3642 25.3768M26.3642 25.3768C26.5476 25.1508 26.7907 24.9707 27.074 24.8593M26.3642 25.3768C26.5471 25.1499 26.7895 24.9693 27.074 24.8593M27.074 24.8593L29.1369 24.0508C29.4449 23.9301 29.6733 23.6649 29.7469 23.3425L30.1326 21.6539C30.2061 21.3323 30.1162 20.9952 29.8924 20.7528L28.3973 19.134M28.3973 19.134C28.1883 18.9128 28.0424 18.6485 27.9716 18.3677M28.3973 19.134C28.2991 19.0307 28.2148 18.9177 28.1461 18.798C28.0677 18.662 28.0092 18.5173 27.9716 18.3677M27.9716 18.3677C27.9021 18.0889 27.9063 17.7935 27.9944 17.5075L28.641 15.4349C28.7414 15.1131 28.6729 14.7623 28.4588 14.502L27.3464 13.1489C27.1401 12.8981 26.8249 12.763 26.5009 12.7867L24.2776 12.9496M24.2776 12.9496C23.9733 12.971 23.6741 12.9131 23.4078 12.7884M24.2776 12.9496C23.9729 12.9723 23.6741 12.9139 23.4078 12.7884M23.4078 12.7884C23.1397 12.6621 22.9046 12.4679 22.7297 12.2203M23.4078 12.7884C23.1393 12.6626 22.9037 12.4689 22.7297 12.2203M11.5094 18.417L11.5102 18.4126M23.1359 20.0106C23.1359 21.8756 21.59 23.3874 19.6834 23.3874C17.7768 23.3874 16.2309 21.8756 16.2309 20.0106C16.2309 18.1457 17.7768 16.6339 19.6834 16.6339C21.59 16.6339 23.1359 18.1457 23.1359 20.0106Z"
    //         stroke="#cecece"
    //         strokeWidth="2"
    //       />
    //     </svg>
    //   ),
    //   title: 'Setting',
    //   url: 'profile/setting',
    //   disable: true,
    // },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#F2F2F2" />
          <path
            d="M22.6471 15.7996V13.6996C22.6471 13.1427 22.424 12.6085 22.0268 12.2147C21.6297 11.8209 21.091 11.5996 20.5294 11.5996H13.1176C12.556 11.5996 12.0174 11.8209 11.6202 12.2147C11.2231 12.6085 11 13.1427 11 13.6996V26.2996C11 26.8566 11.2231 27.3907 11.6202 27.7845C12.0174 28.1784 12.556 28.3996 13.1176 28.3996H20.5294C21.091 28.3996 21.6297 28.1784 22.0268 27.7845C22.424 27.3907 22.6471 26.8566 22.6471 26.2996V24.1996M16.2941 19.9996H29M29 19.9996L25.8235 16.8496M29 19.9996L25.8235 23.1496"
            stroke="#1C1C1C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Log out',
      onClick: onDisconnect,
    },
  ];

  return (
    <div>
      <div className="flex flex-row items-center md:gap-3">
        <div
          className={classNames(
            'flex flex-row items-center gap-1 md:gap-3 p-1 border border-solid rounded-[40px] cursor-pointer',
            isHovered || open ? 'bg-[#f7ffec] border-[#0db774]' : 'border-transparent'
          )}
          onClick={handleClick}
          onMouseEnter={handleMouse}
          onMouseLeave={handleMouse}>
          <AvatarDefault />
          <span className="text-black-1c text-[14px] leading-[22px] font-normal">
            {formatAddress(userAddress || '', 3, 4)}
          </span>
          <MenuIcon actived={open} />
        </div>

        <NotificationMenu />
      </div>

      {open && (
        <ArrowPopover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
          <div className="flex flex-col p-4 shadow-lg rounded-xl bg-white user-menu-popover w-min-[376px] ">
            <div className="flex info flex-col">
              <div className="title">USERNAME</div>
              <div className="flex flex-row mt-2">
                <div className="avatar">
                  <img src="/assets/images/user-information/default-avatar.svg" />
                </div>
                <div className="flex flex-row address-wrapper">
                  <div className="address">{formatAddress(userAddress || '', 10)}</div>
                  <ClickAwayListener onClickAway={handleTooltipAddressClose}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      placement="top"
                      onClose={handleTooltipAddressClose}
                      open={copyAddress && anchorEl !== null}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Copied">
                      <div className="ml-auto cursor-pointer" onClick={() => handleTooltipAddressOpen(userAddress)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.00156 14.3996L3.60156 14.3996C2.93882 14.3996 2.40156 13.8624 2.40156 13.1996L2.40156 4.39961C2.40156 3.29504 3.29699 2.39961 4.40156 2.39961L13.2016 2.39961C13.8643 2.39961 14.4016 2.93687 14.4016 3.59961L14.4016 5.99961M12.0016 21.5996L19.2016 21.5996C20.527 21.5996 21.6016 20.5251 21.6016 19.1996L21.6016 11.9996C21.6016 10.6741 20.527 9.59961 19.2016 9.59961L12.0016 9.59961C10.6761 9.59961 9.60156 10.6741 9.60156 11.9996L9.60156 19.1996C9.60156 20.5251 10.6761 21.5996 12.0016 21.5996Z"
                            stroke="#B6B6B6"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                  </ClickAwayListener>
                </div>
              </div>
              {/* <div className="ml-auto change-wallet mt-2 cursor-pointer">Change wallet</div> */}
            </div>
            <div className="divider" />
            <div className="quick-access">
              <div className="title">QUICK ACCESS</div>
              <div className="quick-access-items">
                {quickAccessMenus.map((item, idx) => {
                  return (
                    <QuickAccessItem
                      key={idx}
                      icon={item.icon}
                      iconDisable={item.iconDisable}
                      title={item.title}
                      url={item.url}
                      onClick={item.onClick}
                      disable={item.disable}></QuickAccessItem>
                  );
                })}
              </div>
            </div>
            <div className="divider" />
            <div className="flex flex-col referral gap-2">
              <div className="title">REFERRAL</div>
              {loggedIn && hasSBT ? (
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <div className="flex flex-col items-start gap-[10px] self-stretch">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-[#1C1C1C]">Your referral link</p>
                      <InformationIcon width="20px" height="20px" />
                    </div>
                    <div className="flex items-start gap-2 self-stretch">
                      <div className="flex flex-col justify-center items-start gap-2">
                        <div className="flex h-[48px] px-4 py-3 flex-col justify-center items-start gap-[10px] self-stretch rounded bg-[#F8F8F8]">
                          <div className="flex items-center gap-2 self-stretch">
                            <div className="flex items-center gap-4">
                              {`${location.origin}/1-id?ref=${userInfo?.referralCode}`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ClickAwayListener onClickAway={handleTooltipReferalClose}>
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          arrow={true}
                          placement="top"
                          onClose={handleTooltipReferalClose}
                          open={copySuccess}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title="Copied">
                          <div
                            className="flex h-[48px] p-[15px] justify-center items-center gap-2 rounded-sm bg-[#0DB774]"
                            onClick={() =>
                              handleTooltipReferalOpen(`${location.origin}/1-id?ref=${userInfo?.referralCode}`)
                            }>
                            <CopyIcon width="15" height="15" />
                          </div>
                        </Tooltip>
                      </ClickAwayListener>
                    </div>
                  </div>
                  <div className="flex flex-col items-center p-2 gap-2 self-stretch rounded-lg bg-[#E7F5FF] shadow-[0_8px_8px_0px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-black text-[#1C1C1C]">Reward points</p>
                      <InformationIcon width="20px" height="20px" isReferral />
                    </div>
                    <div className="text-center text-2xl font-bold linear-text-5">
                      {loggedIn
                        ? referralsDetail.referrals
                          ? new Intl.NumberFormat('en-US').format(referralsDetail.referrals || 0)
                          : '0'
                        : '-'}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <img src="/assets/images/user-information/no-referral.svg" />
                  </div>
                  <div className="no-sbt-guide">You need to have SBT to active this function.</div>
                </>
              )}
            </div>
          </div>
        </ArrowPopover>
      )}
    </div>
  );
};
