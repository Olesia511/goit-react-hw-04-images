import css from './Modal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export const ModalWindow = ({ onClose, photo, isOpen }) => {
  const { largeImageURL, tags } = photo;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image"
      className={css.Modal}
      overlayClassName={css.Overlay}
    >
      <img className={css.ModalImage} src={largeImageURL} alt={tags} />
      <button className={css.ModalBtn} onClick={onClose}>
        close
      </button>
    </Modal>
  );
};
