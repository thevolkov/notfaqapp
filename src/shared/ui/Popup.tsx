import './Popup.css';
import {type ReactNode, useEffect} from 'react';
import IconButton from './IconButton';

interface PopupProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  status: boolean;
}

export default function Popup({
  title,
  children,
  onClose,
  onSubmit,
  submitText = 'Save',
  cancelText = 'Cancel',
  submitDisabled = false,
  status
}: PopupProps) {

  useEffect(() => {
    if (status) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [status]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div>{title}</div>
        <div className="popup-body">{children}</div>
        <div className="popup-actions">
          {onSubmit && (
            <IconButton
              text={submitText}
              iconId="edit"
              onClick={onSubmit}
              disabled={submitDisabled}
            />
          )}
          <IconButton text={cancelText} variant="danger" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
