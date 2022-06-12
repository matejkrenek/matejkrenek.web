import ReactDOM from 'react-dom';
import './Modal.styles.scss';

type ModalProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, header }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__box">
        {header && <header>{header}</header>}
        <main>{children}</main>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};

export default Modal;
