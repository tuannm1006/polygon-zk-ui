import clsx from 'clsx';
import { DefaultFcProps, SOCIALS } from 'common';
import { ReactNode, useEffect, useState } from 'react';
import { BtnVerify, ButtonV2, Dialog, DialogTypes, HtmlTooltip } from 'shared-components';
import { getAccessToken } from 'utils';
import io, { Socket } from 'socket.io-client';
import { useAppContext } from 'contexts';
import { TelegramVerifyModal } from 'shared-components';
import toast from 'react-hot-toast';

export type SocialProfileProps = DefaultFcProps;

const WS_URL = 'https://1id-testing-v2.octan.network';

function VerifyIcon() {
  return <i className="octan-icon octan-icon--badge-check" />;
}

export function TelegramIcon({ isVerify = false }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill={isVerify ? '#34AADF' : '#B6B6B6'} />
      <path
        d="M11.1281 19.2915C11.1281 19.2915 19.266 15.864 22.0883 14.6571C23.1702 14.1743 26.8393 12.6295 26.8393 12.6295C26.8393 12.6295 28.5328 11.9536 28.3916 13.595C28.3446 14.2709 27.9683 16.6363 27.592 19.195C27.0275 22.8157 26.416 26.7742 26.416 26.7742C26.416 26.7742 26.3219 27.8846 25.5222 28.0777C24.7226 28.2708 23.4054 27.4019 23.1702 27.2087C22.982 27.0639 19.6423 24.8915 18.4192 23.8294C18.0899 23.5398 17.7136 22.9605 18.4662 22.2846C20.1597 20.6915 22.1824 18.7122 23.4054 17.4571C23.9699 16.8777 24.5344 15.526 22.1824 17.1674C18.8426 19.5329 15.5498 21.7536 15.5498 21.7536C15.5498 21.7536 14.7972 22.2363 13.386 21.8018C11.9747 21.3674 10.3283 20.7881 10.3283 20.7881C10.3283 20.7881 9.19946 20.0639 11.1281 19.2915Z"
        fill="white"
      />
    </svg>
  );
}

export function FacebookIcon({ isVerify = false }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill={isVerify ? '#337FFF' : '#B6B6B6'} />
      <path
        d="M24.8941 21.3021L25.464 17.681H21.9533V15.3273C21.9533 14.3372 22.4434 13.3697 24.0107 13.3697H25.6293V10.2861C24.6867 10.1358 23.7343 10.0545 22.7797 10.0428C19.8902 10.0428 18.0037 11.7798 18.0037 14.9199V17.681H14.8008V21.3021H18.0037V30.0606H21.9533V21.3021H24.8941Z"
        fill="white"
      />
    </svg>
  );
}

export function TwitterIcon({ isVerify = false }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#B6B6B6" />
      <path
        d="M29.9283 13.6672C29.2679 13.9517 28.5735 14.1498 27.8625 14.2566C28.1949 14.1996 28.6841 13.6006 28.8788 13.3582C29.1746 12.9926 29.4 12.5751 29.5437 12.1271C29.5437 12.0938 29.5769 12.0463 29.5437 12.0225C29.5269 12.0134 29.5081 12.0086 29.4891 12.0086C29.47 12.0086 29.4512 12.0134 29.4344 12.0225C28.6623 12.441 27.8406 12.7604 26.9886 12.9732C26.9589 12.9823 26.9273 12.9831 26.8972 12.9756C26.8671 12.968 26.8396 12.9524 26.8177 12.9304C26.7514 12.8514 26.68 12.7768 26.604 12.707C26.2565 12.3954 25.8622 12.1404 25.4357 11.9512C24.8599 11.7148 24.2379 11.6124 23.6168 11.6518C23.0141 11.6899 22.4256 11.8517 21.8881 12.1271C21.3587 12.4175 20.8935 12.812 20.5203 13.2869C20.1278 13.7757 19.8444 14.343 19.6892 14.9506C19.5613 15.5285 19.5468 16.1259 19.6465 16.7093C19.6465 16.8092 19.6465 16.8234 19.561 16.8092C16.1749 16.3101 13.3967 15.1075 11.1266 12.5264C11.0269 12.4123 10.9746 12.4123 10.8939 12.5264C9.90606 14.0284 10.3857 16.4051 11.6205 17.5792C11.7867 17.7361 11.9577 17.8882 12.1381 18.0308C11.572 17.9905 11.0197 17.837 10.514 17.5792C10.419 17.5174 10.3667 17.5507 10.362 17.6648C10.3485 17.8229 10.3485 17.9819 10.362 18.1401C10.4611 18.8981 10.7595 19.6161 11.2268 20.2207C11.6941 20.8254 12.3134 21.295 13.0215 21.5815C13.1941 21.6555 13.374 21.7113 13.5581 21.7479C13.034 21.8511 12.4965 21.8672 11.9672 21.7954C11.8532 21.7716 11.8105 21.8334 11.8532 21.9428C12.5513 23.8441 14.0663 24.424 15.1776 24.7472C15.3296 24.771 15.4815 24.771 15.6525 24.809C15.6525 24.809 15.6525 24.809 15.624 24.8375C15.2963 25.4365 13.9713 25.8405 13.3634 26.0496C12.2539 26.4485 11.0709 26.601 9.89657 26.4965C9.71135 26.4679 9.66861 26.4727 9.62112 26.4965C9.57363 26.5202 9.62112 26.5725 9.67336 26.62C9.91081 26.7769 10.1483 26.9148 10.3952 27.0478C11.1304 27.4492 11.9076 27.768 12.7128 27.9985C16.8825 29.1488 21.5746 28.3027 24.7043 25.1893C27.1644 22.7461 28.0287 19.376 28.0287 16.0011C28.0287 15.8727 28.1854 15.7967 28.2757 15.7301C28.898 15.2448 29.4467 14.6716 29.9046 14.0284C29.9839 13.9326 30.0245 13.8105 30.0186 13.6862C30.0186 13.6149 30.0186 13.6292 29.9283 13.6672Z"
        fill="white"
      />
    </svg>
  );
}

export function DiscordIcon({ isVerify = false }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#B6B6B6" />
      <path
        d="M27.2916 13.4441C29.6485 16.934 30.8125 20.8705 30.3774 25.4024C30.3755 25.4216 30.3656 25.4392 30.35 25.4507C28.5651 26.7706 26.8358 27.5716 25.1308 28.1029C25.1175 28.1069 25.1033 28.1067 25.0901 28.1022C25.077 28.0977 25.0656 28.0892 25.0575 28.0779C24.6636 27.5259 24.3056 26.944 23.9921 26.3329C23.9741 26.2969 23.9905 26.2536 24.0276 26.2394C24.596 26.0237 25.1365 25.7652 25.6564 25.4591C25.6974 25.435 25.7 25.3759 25.6622 25.3475C25.5518 25.265 25.4425 25.1783 25.3379 25.0916C25.3183 25.0756 25.292 25.0724 25.2698 25.0832C21.8944 26.6529 18.1969 26.6529 14.7816 25.0832C14.7594 25.0732 14.733 25.0766 14.714 25.0924C14.6097 25.1791 14.5001 25.265 14.3908 25.3475C14.353 25.3759 14.3561 25.435 14.3973 25.4591C14.9172 25.7594 15.4577 26.0237 16.0254 26.2405C16.0622 26.2546 16.0797 26.2969 16.0614 26.3329C15.7546 26.9448 15.3967 27.5267 14.9955 28.0787C14.978 28.101 14.9493 28.1113 14.9222 28.1029C13.2252 27.5716 11.4959 26.7706 9.71106 25.4507C9.69619 25.4392 9.68549 25.4208 9.68393 25.4016C9.32027 21.4816 10.0614 17.5125 12.7669 13.4433C12.7734 13.4325 12.7833 13.4241 12.7948 13.4191C14.126 12.8038 15.5522 12.3512 17.0428 12.0927C17.0699 12.0885 17.097 12.1011 17.1111 12.1252C17.2953 12.4536 17.5058 12.8748 17.6483 13.2189C19.2195 12.9772 20.8152 12.9772 22.4193 13.2189C22.5617 12.8821 22.7649 12.4536 22.9483 12.1252C22.9549 12.1132 22.965 12.1036 22.9773 12.0978C22.9895 12.0919 23.0033 12.0901 23.0167 12.0927C24.5081 12.352 25.9342 12.8046 27.2644 13.4191C27.2762 13.4241 27.2858 13.4325 27.2916 13.4441ZM18.447 20.8973C18.4635 19.7385 17.6245 18.7796 16.5714 18.7796C15.5269 18.7796 14.696 19.7301 14.696 20.8973C14.696 22.0643 15.5433 23.0148 16.5714 23.0148C17.6162 23.0148 18.447 22.0643 18.447 20.8973ZM25.3815 20.8973C25.3979 19.7385 24.5589 18.7796 23.5061 18.7796C22.4613 18.7796 21.6304 19.7301 21.6304 20.8973C21.6304 22.0643 22.4777 23.0148 23.5061 23.0148C24.5589 23.0148 25.3815 22.0643 25.3815 20.8973Z"
        fill="white"
      />
    </svg>
  );
}

function VerifyCheckIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.1292 1.06048C11.581 0.511091 12.422 0.511091 12.8738 1.06048L15.3139 4.02754C15.5246 4.28383 15.8374 4.43447 16.1692 4.43946L20.0103 4.49721C20.7215 4.5079 21.2459 5.16546 21.098 5.86123L20.2996 9.61885C20.2307 9.94342 20.3079 10.2819 20.5109 10.5444L22.8606 13.5835C23.2957 14.1462 23.1085 14.9662 22.4724 15.2844L19.0368 17.003C18.74 17.1515 18.5235 17.4229 18.4448 17.7452L17.5338 21.4772C17.3651 22.1682 16.6074 22.5331 15.9619 22.2341L12.4762 20.6196C12.1751 20.4801 11.8279 20.4801 11.5268 20.6196L8.04108 22.2341C7.39566 22.5331 6.6379 22.1682 6.46921 21.4772L5.55819 17.7452C5.4795 17.4229 5.26303 17.1515 4.96627 17.003L1.53064 15.2844C0.894489 14.9662 0.707337 14.1462 1.14242 13.5835L3.49214 10.5444C3.6951 10.2819 3.77235 9.94342 3.70339 9.61885L2.90497 5.86123C2.75714 5.16546 3.28152 4.5079 3.99274 4.49721L7.83382 4.43946C8.1656 4.43447 8.4784 4.28383 8.68916 4.02754L11.1292 1.06048Z"
        fill="url(#paint0_linear_1019_67516)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4887 8.63271C16.7111 8.85135 16.7141 9.20889 16.4955 9.43129L10.3888 15.6431C10.2827 15.7511 10.1376 15.8119 9.98614 15.8119C9.8347 15.8119 9.6896 15.7511 9.58344 15.6431L7.50185 13.5256C7.28321 13.3032 7.28626 12.9457 7.50866 12.7271C7.73107 12.5084 8.08861 12.5115 8.30725 12.7339L9.98614 14.4417L15.6901 8.63952C15.9087 8.41712 16.2663 8.41407 16.4887 8.63271Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1019_67516"
          x1="0.908744"
          y1="11.4939"
          x2="23.0969"
          y2="11.4939"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FF7C" />
          <stop offset="1" stopColor="#00C4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type Profile = {
  icon: ReactNode;
  title: string;
  isVerify: boolean;
  link: string;
  provider: string;
};

const profiles: Profile[] = [
  {
    icon: <TelegramIcon />,
    title: 'Telegram',
    isVerify: true,
    link: '',
    provider: SOCIALS.telegram,
  },
  {
    icon: <DiscordIcon />,
    title: 'Discord',
    isVerify: false,
    link: '',
    provider: SOCIALS.discord,
  },
  {
    icon: <FacebookIcon />,
    title: 'Facebook',
    isVerify: true,
    link: '',
    provider: SOCIALS.facebook,
  },
  {
    icon: <TwitterIcon />,
    title: 'Twitter',
    isVerify: false,
    link: '',
    provider: SOCIALS.twitter,
  },
];

export const SocialProfile: React.FC<SocialProfileProps> = ({ className }) => {
  const [socket, setSocket] = useState<Socket>();
  const [openTelegramVerify, setOpenTelegramVerify] = useState(false);
  const [openVerifySuccess, setOpenVerifySuccess] = useState(false);

  const { fetchSocialProfile, socialAccounts } = useAppContext();
  const accessToken = getAccessToken();

  useEffect(() => {
    fetchSocialProfile();
  }, []);

  useEffect(() => {
    console.log('connecting to websocket');
    // connect to WebSocket server
    const newSocket = io(`${WS_URL}?token=${accessToken}`);
    setSocket(newSocket);

    // set up event listeners for incoming messages
    newSocket.on('connect', () => console.log('Connected to WebSocket'));
    newSocket.on('disconnect', () => console.log('Disconnected from WebSocket'));
    newSocket.on('link-social-status', (data) => {
      console.log('link-social-status ::: ', data);
      if (!data.success) {
        toast.error(`Verify ${data.provider} failed`);
        return;
      }

      if (data.provider === SOCIALS.telegram && data.success) {
        setOpenTelegramVerify(false);
        setOpenVerifySuccess(true);

        setTimeout(() => {
          setOpenVerifySuccess(false);
        }, 5000);
      }

      if (data.success) {
        // Fetch social profile
        fetchSocialProfile();
      }
    });

    // clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [accessToken]);

  const handleOnVerify = (profile: Profile): void => {
    switch (profile.provider) {
      case SOCIALS.twitter:
        window.open(`https://1id-testing-v2.octan.network/link-social/twitter?token=${accessToken}`, '_blank');
        break;
      case SOCIALS.discord:
        window.open(`https://1id-testing-v2.octan.network/link-social/discord?token=${accessToken}`, '_blank');
        break;
      case SOCIALS.telegram:
        setOpenTelegramVerify(true);
        break;
    }
  };

  const getUserAccountLink = (provider: string, providerUrl: string) => {
    if (!socialAccounts || socialAccounts.length === 0) {
      return providerUrl;
    }

    const sa = socialAccounts.find((sa) => sa.provider === provider);
    if (!sa) {
      return providerUrl;
    }

    return sa.url;
  };

  const isVerified = (provider: string) => {
    if (!socialAccounts || socialAccounts.length === 0) {
      return false;
    }

    const sa = socialAccounts.find((sa) => sa.provider === provider);
    return sa !== undefined;
  };

  const handleCloseTelegramVerifyModal = () => {
    setOpenTelegramVerify(false);
  };

  const handleCloseVerifySuccess = () => {
    setOpenVerifySuccess(false);
  };

  return (
    <div className={className}>
      <div className="text-xl md:text-[24px] leading-[34px] font-medium text-black pb-6 border-b-2 border-[#E9E9E9] border-solid">
        Social account
      </div>
      {/* <div className="font-bold text-2xl md:text-3xl text-center text-white">Social profile</div> */}
      <div className="mt-6 pb-6 flex flex-col gap-y-3 w-full border-b-2 border-[#E9E9E9] border-solid">
        {profiles.map((profile, i) => (
          <div key={`profile-${i}`} className="flex w-full justify-between ">
            <div className="flex">
              <div className="w-[40px] h-[40px] mr-6">{profile.icon}</div>
              <div className="flex flex-col">
                <p className="text-lg leading-[29px] text-[#1C1C1C]">{profile.title}</p>
                <span className="text-sm leading-[22px] text-[#4185EC]">
                  {profile.link ? getUserAccountLink(profile.provider, profile.link) : '-'}
                </span>
              </div>
            </div>
            <div className="items-center flex justify-center">
              {!isVerified(profile.provider) ? (
                <HtmlTooltip
                  arrow={true}
                  placement="left"
                  sx={{ backgroundColor: '#fff', color: '#b2b2b2' }}
                  title={'Coming soon.'}>
                  {/* <ButtonV2
                    className="h-12 w-[122px]"
                    onClick={() => handleOnVerify(profile)}>
                    Verify
                  </ButtonV2> */}
                  <ButtonV2 className="h-12 w-[122px] !bg-[#F2F2F2] !cursor-default !text-[#a8aeba]">Verify</ButtonV2>
                </HtmlTooltip>
              ) : (
                // </HtmlTooltip>
                <p className="underline underline-offset-1">Change</p>
              )}
            </div>
            {profile.provider === SOCIALS.telegram && (
              <>
                <TelegramVerifyModal
                  open={openTelegramVerify}
                  onClose={handleCloseTelegramVerifyModal}></TelegramVerifyModal>
                <Dialog type={DialogTypes.None} open={openVerifySuccess} handleClose={handleCloseVerifySuccess}>
                  <div className="flex flex-col justify-center">
                    <img src="/assets/images/social-networks/telegram-verify-success.svg" />
                    <div className="text-center text-zinc-900 text-[24px] font-medium leading-loose">
                      Verify Telegram successful
                    </div>
                  </div>
                </Dialog>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-6">
        <VerifyCheckIcon />
        <div className="ml-3 text-[#5B5B5B] leading-[28px] text-lg">Use your main account to get more benefits</div>
      </div>
    </div>
  );
};
