import { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';

export interface ICustomModal extends ModalProps {
  open: boolean;
  fullScreen?: boolean;
  children: ReactNode;
  onCancel: () => void;
}

const CustomModal: FC<ICustomModal> = ({
  open = false,
  children,
  onCancel,
  fullScreen = false,
  ...restProps
}) => (
  <Modal
    open={open}
    footer={null}
    {...restProps}
    onCancel={onCancel}
    style={{
      width: fullScreen ? '100vw' : '100%',
      height: fullScreen ? '100vh' : 'auto',
      margin: fullScreen ? 0 : 'auto',
      top: fullScreen ? 0 : '',
      maxWidth: '100%',
      paddingBottom: '0',
    }}
    className={fullScreen ? '--full-screen' : ''}
  >
    {children}
  </Modal>
);

export default CustomModal;
