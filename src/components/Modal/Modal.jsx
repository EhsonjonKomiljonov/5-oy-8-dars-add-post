import { useRef } from 'react';
import './modal.css';

export const Modal = ({ children, modal, setModal, title }) => {
  const overlayRef = useRef();

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={(evt) => handleOverlay(evt)}
      className={`overlay ${modal ? 'open' : ''}`}
    >
      <div className='modal-wrapper'>
        <button
          onClick={() => setModal(false)}
          className='modal-btn btn btn-danger rounded-0'
        >
          &times;
        </button>
        <div className='modal-header'>
          <h3 className='mb-4'>{title}</h3>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};
