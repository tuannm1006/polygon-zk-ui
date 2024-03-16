import { DefaultFcProps } from 'common';
import { Modal } from 'shared-components';

export enum DialogTypes {
  None = 'none',
  Info = 'info',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

type DialogProps = DefaultFcProps & {
  type?: string;
  title?: string;
  subTitle?: string;
  open: boolean;
  handleClose: () => void;
};

export const Dialog: React.FC<DialogProps> = ({
  className,
  type = DialogTypes.Success,
  title,
  subTitle,
  open,
  children,
  handleClose,
}) => {
  return (
    <Modal className={className} open={open} handleClose={handleClose} title={title}>
      {type !== DialogTypes.None && (
        <i className={`octan-icon octan-icon--${type === DialogTypes.Success ? 'success' : 'warning'}-xl mx-auto`}></i>
      )}
      {/* {title && <div className="font-bold text-3xl text-center mt-6 mb-2 text-white">{title}</div>} */}
      {subTitle && <div className="font-medium text-xl text-center mb-6 whitespace-pre-wrap">{subTitle}</div>}
      {children}
    </Modal>
  );
};
