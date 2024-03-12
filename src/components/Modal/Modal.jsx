import { forwardRef } from 'react';
import css from './Modal.module.css';

const Modal = forwardRef(({ children, onClose }, ref) => {
  return (
    <dialog ref={ref} className={css.modal} onClick={onClose}>
      {children}
    </dialog>
  );
});

Modal.displayName = 'Modal';
export default Modal;
