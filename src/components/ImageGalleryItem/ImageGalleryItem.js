import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { ModalWindow } from 'components/Modal/Modal';

export const CardPhoto = ({ photo }) => {
  const { tags, webformatURL } = photo;
  
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  
  const closeModal = () => {
    setModal(false);
  };

    return (
      <>
        <li className={css.ImageGalleryItem} onClick={openModal}>
          <img
            className={css['ImageGalleryItem-image']}
            src={webformatURL}
            alt={tags}
            width="200"/>
        </li>

        <ModalWindow
          onClose={closeModal}
          photo={photo}
          isOpen={modal}/>
      </>
    );
}
