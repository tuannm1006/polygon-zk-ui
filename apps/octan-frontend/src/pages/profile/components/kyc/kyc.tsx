import { DefaultFcProps } from 'common';
import { BtnVerify, HtmlTooltip } from 'shared-components';

export type KycProps = DefaultFcProps;

function KYCCard() {
  return (
    <svg width="250" height="200" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="250" height="200" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63 134H154C154.515 134 155.017 133.944 155.5 133.839C155.983 133.944 156.485 134 157 134H209C212.866 134 216 130.866 216 127C216 123.134 212.866 120 209 120H203C199.134 120 196 116.866 196 113C196 109.134 199.134 106 203 106H222C225.866 106 229 102.866 229 99C229 95.134 225.866 92 222 92H200C203.866 92 207 88.866 207 85C207 81.134 203.866 78 200 78H136C139.866 78 143 74.866 143 71C143 67.134 139.866 64 136 64H79C75.134 64 72 67.134 72 71C72 74.866 75.134 78 79 78H39C35.134 78 32 81.134 32 85C32 88.866 35.134 92 39 92H64C67.866 92 71 95.134 71 99C71 102.866 67.866 106 64 106H24C20.134 106 17 109.134 17 113C17 116.866 20.134 120 24 120H63C59.134 120 56 123.134 56 127C56 130.866 59.134 134 63 134ZM226 134C229.866 134 233 130.866 233 127C233 123.134 229.866 120 226 120C222.134 120 219 123.134 219 127C219 130.866 222.134 134 226 134Z"
        fill="url(#paint0_linear_1001_66346)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.952 70.5174L152.977 57.2257C154.613 56.9637 156.151 58.0777 156.413 59.7137C156.414 59.717 156.414 59.7203 156.415 59.7235L164.537 111.556C164.793 113.189 163.679 114.721 162.047 114.982L79.0222 128.274C77.3862 128.536 75.8476 127.422 75.5857 125.786C75.5852 125.783 75.5847 125.779 75.5841 125.776L67.4624 73.9441C67.2065 72.311 68.3198 70.7787 69.952 70.5174Z"
        fill="white"
      />
      <path
        d="M83.3448 127.423L80.1615 127.948C77.9748 128.308 75.9214 126.756 75.575 124.481L68.0499 75.0391C67.7036 72.7636 69.1955 70.6268 71.3822 70.2664L151.558 57.0519C153.745 56.6916 155.798 58.2441 156.145 60.5196C156.482 62.7367 156.751 64.5036 156.952 65.8203M157.523 69.5758C157.705 70.7685 157.864 71.8129 158 72.7091"
        stroke="#0DB774"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M73.9751 72.7922L149.735 60.9612C151.367 60.7063 152.898 61.8186 153.16 63.4494L160.52 109.268C160.783 110.904 159.67 112.444 158.034 112.706C158.03 112.707 158.025 112.708 158.021 112.708L82.261 124.539C80.629 124.794 79.0981 123.682 78.8361 122.051L71.4759 76.2321C71.2131 74.5962 72.3263 73.0571 73.9621 72.7943C73.9664 72.7936 73.9708 72.7929 73.9751 72.7922Z"
        fill="#F3FFFD"
      />
      <path
        d="M170.75 77.25H92.25C90.0409 77.25 88.25 79.0409 88.25 81.25V129.75C88.25 131.959 90.0409 133.75 92.25 133.75H170.75C172.959 133.75 174.75 131.959 174.75 129.75V81.25C174.75 79.0409 172.959 77.25 170.75 77.25Z"
        fill="white"
        stroke="#0DB774"
        strokeWidth="2.5"
      />
      <path d="M173.5 89H89.5V103H173.5V89Z" fill="#F3FFFD" />
      <path
        d="M103.29 89H96.0931M174.172 89H108.331H174.172ZM168.172 102H89.332H168.172ZM125.063 121H96.7551H125.063Z"
        stroke="#0DB774"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1001_66346"
          x1="127.001"
          y1="134.014"
          x2="126.991"
          y2="63.9843"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0EEFF" stopOpacity="0" />
          <stop offset="0.5001" stopColor="#E9E8FD" stopOpacity="0.5001" />
          <stop offset="1" stopColor="#DDDCF9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
export const Kyc: React.FC<KycProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="font-bold text-xl md:text-2xl leading-[34px] text-black pb-6 border-b-2 border-[#E9E9E9] border-solid">
        KYC
      </div>

      <div className="flex flex-col items-center mt-10 md:mt-16">
        {/* <GradientCheckbox id="accept-terms" label="Please read our privacy policy and terms of service " /> */}
        <div className="flex flex-col justify-center items-center">
          <KYCCard />
          <div>You have not verify your KYC information.</div>
        </div>
        <HtmlTooltip title="Coming soon" arrow={true} placement="top">
          <BtnVerify
            sx={{
              width: '154px',
              height: '48px',
              padding: '11px 20px',
              marginTop: '35px',
              backgroundColor: '#F2F2F2',
              color: '#a8aeba',
              border: 'none',
            }}>
            Verify KYC now
          </BtnVerify>
        </HtmlTooltip>
      </div>
    </div>
  );
};
