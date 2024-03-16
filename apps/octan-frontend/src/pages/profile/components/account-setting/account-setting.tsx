import { Button, FormHelperText, InputAdornment } from '@mui/material';
import { DefaultFcProps, USERNAME_MAX_LENGTH } from 'common';
import { isEmail } from '@octan/common';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import UploadButton from './components/upload-btn';
import { ButtonV2, DialogMintSuccess, DialogTypes, Input, OutlinedGradientButton } from 'shared-components';
import { hasPath, isEmpty, propOr } from 'ramda';
import { useEffect, useLayoutEffect, useState } from 'react';
import { DEFAULT_AVATAR_URL } from 'consts';
import { showModalActions } from '../../../../app/helpers';
import { useEmit, useMintSbt } from 'utils';
import { useAppContext } from 'contexts';
import { getApi } from 'swagger';
import squareicon from 'squareicon';
import { debounce } from 'debounce';
import clsx from 'clsx';
export type AccountSettingProps = DefaultFcProps & {
  isModal: boolean;
};

const formSchema = Yup.object().shape({
  avatar_id: Yup.string(),
  avatar_url: Yup.string(),
  domain_name: Yup.string(),
  username: Yup.string()
    .required('Username is required')
    .max(USERNAME_MAX_LENGTH)
    .test('invalidUsername', 'Username has format 0-9 & A-Z', (value) => !/[^A-Za-z0-9]+/g.test(value)),
  email: Yup.string().required('Email is required').email('Please provide a valid email address.'),
  otp: Yup.string().required('OTP is required'),
});

const defaultValues = {
  avatar_id: '',
  avatar_url: '',
  domain_name: '',
  username: '',
  email: '',
  otp: '',
};

export function InformationIcon({ color = '#4185EC' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {' '}
      <path
        d="M10.9984 10.9999L10.9984 15.7999M10.9984 7.44209V7.3999M1.39844 10.9999C1.39844 5.69797 5.6965 1.3999 10.9984 1.3999C16.3004 1.3999 20.5984 5.69797 20.5984 10.9999C20.5984 16.3018 16.3004 20.5999 10.9984 20.5999C5.6965 20.5999 1.39844 16.3018 1.39844 10.9999Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />{' '}
    </svg>
  );
}

interface VerifyUsernameResp {
  code: string;
  message: string;
}

export const AccountSetting: React.FC<AccountSettingProps> = ({ className, isModal }) => {
  const appContext = useAppContext();

  const { userInfo, userAddress, hasRevokedSbt, fetchUserInfo, hasSBT, loggedIn } = appContext;

  const mintSbt = useMintSbt();

  const [keyRender, setKeyRender] = useState({});
  const [isInprogress, setIsInprogress] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [checkUsernameMessage, setCheckUsernameMessage] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | undefined>();
  const [isMailVerified, setIsMailVerified] = useState<boolean | undefined>();
  const [verifyEmailMsg, setVerifyEmailMsg] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();
  const [countdown, setCountdown] = useState(-1);

  const [preEmail, setPreEmail] = useState('');
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [isUsernameFormatValid, setIsUsernameFormatValid] = useState<boolean | undefined>();

  const emit = useEmit();
  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'firstError',
    resolver: yupResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  const onAvatarChange = (file: File) => {
    // apiPostUploadAvatar(file).then((res: any) => {
    //   // url
    //   setValue('avatar_id', res.data.id)
    // })
  };

  const onDeleteAvatar = async (avatarUrl: string) => {
    // apiPostUploadAvatar(file).then((res: any) => {
    //   // url
    //   setValue('avatar_id', res.data.id)
    // })
    setValue('avatar_url', avatarUrl);
  };

  const startVerifyUsername = async () => {
    try {
      const { username } = getValues();

      const res = await getApi().usersValidateUsernamePost({
        username,
      });

      const result = await res.text();

      setIsUsernameValid(result === 'true');
      setCheckUsernameMessage(
        result === 'true' ? 'This username is available' : 'This username is unavailable, please choose other username'
      );
    } catch (error: any) {
      if (error.json) {
        const err = await error.json();

        if (err.code === 'BAD_REQUEST') {
          setCheckUsernameMessage(`Sorry, this Username is exist in our records. Try to recover your Username.`);
        }
      }
    }
  };

  const startVerifyEmail = async () => {
    try {
      if (countdown > 0) return;

      const { email } = getValues();

      setPreEmail(email);
      const res = await getApi().usersSendVerifyEmailPost({
        email,
      });
      const result = await res.text();
      if (result === 'true') {
        setCountdown(30);
        setIsOtpSent(true);
      }
    } catch (error: any) {
      if (error.json) {
        const err = await error.json();
        setIsEmailValid(false);
        if (err.code === 'BAD_REQUEST') {
          setVerifyEmailMsg(err.message);
        }
      }
    }
  };

  const onMint = async () => {
    try {
      const isOk = await trigger();
      if (!isOk) return;

      setIsInprogress(true);

      const transactionHash = await mintSbt(appContext);
      if (!!transactionHash) {
        setTxHash(transactionHash);
        setIsOpenSuccess(true);
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: propOr('Something wrong', 'message', data),
        });
      }
    }
    setIsInprogress(false);
  };

  const verifyEmail = async () => {
    try {
      const { username, email } = getValues();
      const res = await getApi().usersVerifyEmailPost({
        username,
        email,
        code: otp,
      });
      const result = await res.text();
      if (result === 'true') {
        toast.success('Verify successful');

        setIsMailVerified(true);
        fetchUserInfo();
      }
    } catch (error: any) {
      if (error.json) {
        const err = await error.json();
        if (err.code === 'BAD_REQUEST') {
          setResultMsg(err.message);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (countdown <= 0) return;
    const handler = setTimeout(() => {
      setCountdown((val) => {
        return val - 1;
      });
    }, 1000);

    return () => clearTimeout(handler);
  }, [countdown]);

  useEffect(() => {
    setValue('username', userInfo?.username || '');
    setIsUsernameValid(!!userInfo?.username);
    setValue('email', userInfo?.email || '');
    setIsMailVerified(userInfo?.isVerifyEmail);
  }, [userInfo]);

  useEffect(() => {
    if (!loggedIn) {
      setValue('avatar_url', DEFAULT_AVATAR_URL);
    } else {
      const avatar_url = getValues('avatar_url');
      if (isEmpty(avatar_url) || avatar_url === DEFAULT_AVATAR_URL) {
        squareicon({
          ...squareicon.DEFAULT,
          id: userInfo?.id,
          padding: 10,
          background: '#fff',
        }).then((data: any) => {
          // setValue('avatar_url', data);
          setValue('avatar_url', DEFAULT_AVATAR_URL);
          setKeyRender({});
        });
      }
    }
  }, [userInfo, loggedIn]);

  const onUsernameChange = debounce(async (nextVal: string) => {
    const checkFormat = !/[^A-Za-z0-9]+/g.test(nextVal);
    if (checkFormat) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
    // setCheckUsernameMessage('');
  }, 500);

  const onEmailChange = debounce(async (nextVal: string) => {
    if (!nextVal || nextVal !== userInfo?.email) setIsMailVerified(false);
    else setIsMailVerified(userInfo?.isVerifyEmail);
    setIsEmailValid(isEmail(nextVal));
    setVerifyEmailMsg('');
  }, 500);

  const renderEmailInput = (value: string) => {
    if (isMailVerified) {
      return {};
    }

    return {
      ...(!isMailVerified && isUsernameValid === true
        ? {
            endAdornment: (
              <InputAdornment position="start">
                <ButtonV2
                  // sx={{ fontWeight: 500, color: 'white', backgroundColor: '#F2F2F2' }}
                  sx={{ height: '32px', color: '#fff' }}
                  disabled={!isEmailValid}
                  onClick={startVerifyEmail}>
                  {countdown === -1
                    ? 'Send OTP'
                    : countdown > 0
                    ? countdown
                    : value === preEmail
                    ? 'Resend'
                    : 'Send OTP'}
                </ButtonV2>
              </InputAdornment>
            ),
          }
        : {
            endAdornment: (
              <InputAdornment position="start">
                <ButtonV2
                  // sx={{ color: '#B6B6B6', backgroundColor: '#F2F2F2' }}
                  sx={{ height: '32px' }}
                  disabled={!isEmailValid}
                  onClick={startVerifyEmail}>
                  {countdown === -1
                    ? 'Send OTP'
                    : countdown > 0
                    ? countdown
                    : value === preEmail
                    ? 'Resend'
                    : 'Send OTP'}
                </ButtonV2>
              </InputAdornment>
            ),
          }),
      ...{ readOnly: countdown > 0 || hasSBT },
    };
  };

  return (
    <>
      <div className={className}>
        {!isModal && (
          <div className="w-[906px] text-black text-2xl font-medium leading-[34px] pb-6 border-b-2 border-[#E9E9E9] border-solid">
            Username & Email
          </div>
        )}

        {/* <Divider orientation="horizontal" variant="middle" textAlign="center" sx={{ height: '40px' }} /> */}
        {!isMailVerified && (
          <div
            className={
              isModal
                ? 'flex text-blue py-3 pl-2 border-2 border-solid shadow-lg bg-information-blue border-information-blue'
                : 'flex text-blue rounded h-12 mt-6 py-3 pl-2 border-2 border-solid shadow-lg bg-information-blue border-information-blue align-center'
            }>
            {InformationIcon({ color: '#4185EC' })}{' '}
            <div className="ml-[10px] h-[22px] text-[#4185EC]">Username & Email after verified cannot be changed.</div>
          </div>
        )}

        <div className="flex flex-col items-center my-6">
          <UploadButton
            placeholder={getValues().avatar_url}
            disabled={isInprogress}
            onChange={onAvatarChange}
            onDeleteAvatar={onDeleteAvatar}
          />
        </div>

        {isMailVerified && (
          <div className="flex flex-col">
            <div className="flex justify-center text-[34px] text-[#1C1C1C] leading-[44px] font-bold">
              {userInfo?.username}
            </div>
            <div className="flex justify-center text-[#4185EC] text-[20px] leading-[30px] font-normal mt-2">
              {userInfo?.email}
            </div>
          </div>
        )}
        {!isMailVerified && (
          <div className="flex flex-col text-black max-w-[600px] mx-auto gap-y-6">
            <div>
              <Controller
                control={control}
                name="username"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Input
                      required
                      id="username"
                      label="Username"
                      placeholder="Enter username"
                      sx={{ marginTop: '-8px' }}
                      InputProps={{
                        ...(value && value.length > 0
                          ? isUsernameValid === false
                            ? {
                                endAdornment: (
                                  <InputAdornment position="start">
                                    {/* <ButtonV2
                                  sx={{ fontSize: '14px', lineHeight: '22px' }}
                                  className="px-[14px] py-[5px] rounded-sm bg-[#F2F2F2] text-[#B6B6B6] cursor-pointer font-medium text-sm h-8 w-[133px] leading-[22px]"
                                  onClick={startVerifyUsername}>
                                  {' '}
                                  Check available
                                </ButtonV2> */}
                                  </InputAdornment>
                                ),
                              }
                            : {
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <ButtonV2
                                      sx={{ fontSize: '14px', lineHeight: '22px' }}
                                      className="px-[14px] py-[5px] rounded-sm bg-[#F2F2F2] text-[#B6B6B6] cursor-pointer font-medium text-sm h-8 w-[133px] leading-[22px]"
                                      onClick={startVerifyUsername}>
                                      {' '}
                                      Check available
                                    </ButtonV2>
                                  </InputAdornment>
                                ),
                              }
                          : {
                              endAdornment: (
                                <InputAdornment position="start">
                                  <ButtonV2
                                    sx={{ fontSize: '14px', lineHeight: '22px' }}
                                    className="px-[14px] py-[5px] rounded-sm !bg-[#F8F8F8] !text-[#B6B6B6] cursor-pointer font-medium text-sm h-8 w-[133px] leading-[22px]"
                                    onClick={startVerifyUsername}>
                                    {' '}
                                    Check available
                                  </ButtonV2>
                                </InputAdornment>
                              ),
                            }),
                        ...{ readOnly: hasSBT },
                      }}
                      value={value}
                      onChange={(event: any) => {
                        // const value = event.target.value + '';
                        // // if (/[^0-9a-zA-Z]+/gi.test(value) || value.length >= 16) return;
                        // if (value.length > USERNAME_MAX_LENGTH) return;

                        onChange(event);
                        onUsernameChange(event.target.value);
                      }}
                      error={hasPath(['username', 'message'], errors) || isUsernameValid === false}
                      helperText={
                        <div className="flex gap-2">
                          {/* {errors.username?.message && (
                            <img src="/assets/images/error-mark.svg" alt="" className="h-4 w-4" />
                          )}
                          {checkUsernameMessage === 'This username is available' && (
                            <img src="/assets/images/success-mark.svg" alt="" className="h-4 w-4" />
                          )} */}
                          <p
                            className={clsx(
                              checkUsernameMessage === 'This username is available'
                                ? 'text-[#00AA6C]'
                                : 'text-[#FF4747]'
                            )}>
                            {errors.username?.message || checkUsernameMessage}
                          </p>
                        </div>
                      }
                      // helperText={errors.username?.message || checkUsernameMessage}
                    />
                    {checkUsernameMessage !== 'This username is available' && (
                      <div className="flex justify-between text-slate-500 mt-2">
                        <FormHelperText className="!text-[#B6B6B6] bg-white">
                          Username maximum 30 characters.
                        </FormHelperText>
                        <FormHelperText className="!text-[#B6B6B6] bg-white">
                          {value.length === 0 ? '0' : value.length}/30
                        </FormHelperText>
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    required
                    sx={{ backgroundColor: '#fff !important', borderRadius: 0, marginTop: '-8px' }}
                    id="email"
                    label="Email"
                    placeholder="Enter your Email"
                    type="email"
                    InputProps={renderEmailInput(value)}
                    value={value}
                    onChange={(event: any) => {
                      onChange(event);
                      onEmailChange(event.target.value);
                    }}
                    error={hasPath(['email', 'message'], errors) || isEmailValid === false}
                    helperText={errors.email?.message || verifyEmailMsg}
                  />
                )}
              />

              {!isMailVerified && isOtpSent && (
                <div className="text-[#4185EC] font-normal text-[14px] leading-[22px] mt-2">
                  A code was sent to your email. Please check and verify with it. If you do not see the email in a few
                  minutes, check your “junk mail” folder or “spam” folder.
                </div>
              )}
            </div>

            {isEmailValid && !isMailVerified && isOtpSent && (
              <div>
                <Controller
                  control={control}
                  name="otp"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      required
                      id="otp"
                      placeholder="******"
                      label="OTP"
                      value={otp}
                      onChange={(event) => {
                        if (event.target.value.length > 6) return;
                        setOtp(event.target.value);
                      }}
                    />
                  )}
                />
                {resultMsg && resultMsg.length > 0 && (
                  <div className="mt-2 text-[#FF4747] text-[14px] leading-[22px] font-normal">
                    Wrong OTP, please check and enter OTP again
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col items-center">
              <ButtonV2
                sx={{ lineHeight: '26px' }}
                className="w-[200px] h-[56px] rounded-sm"
                disabled={!isOtpSent || !isUsernameValid || otp.length < 6 || countdown <= 0}
                onClick={verifyEmail}>
                Submit
              </ButtonV2>
            </div>
            {/* {!isModal && (
              <div className="mt-6 w-full mx-auto flex flex-col gap-6 items-center">
                {!hasSBT && (
                  <>
                    <div>
                      <OutlinedGradientButton
                        className="w-[200px] h-[48px] !disabled:color-[#B6B6B6] !rounded-sm"
                        disabled={
                          isInprogress ||
                          !isUsernameValid ||
                          !isMailVerified ||
                          (!!userInfo?.primaryWallet && userInfo?.primaryWallet !== userAddress)
                        }
                      >
                        Submit
                      </OutlinedGradientButton>
                    </div>
                    {!!userInfo?.primaryWallet && userInfo?.primaryWallet !== userAddress && (
                      <span>
                        You need to connect primary wallet to Octan Network to{' '}
                        {hasRevokedSbt ? 'Re-Issue SBT' : 'Mint SBT'}
                      </span>
                    )}
                  </>
                )}
              </div>
            )} */}
          </div>
        )}
      </div>
      {isOpenSuccess && (
        <DialogMintSuccess txHash={txHash} open={isOpenSuccess} handleClose={() => setIsOpenSuccess(false)} />
      )}
    </>
  );
};

const StyledButton = styled(Button)({
  textTransform: 'none',
  color: '#A8AEBA',
});
