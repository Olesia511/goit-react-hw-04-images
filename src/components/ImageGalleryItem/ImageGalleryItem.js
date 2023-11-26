import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { ModalWindow } from 'components/Modal/Modal';

export class CardPhoto extends Component {
  state = {
    isOpenModal: false,
  };

  openModal = () => {
    this.setState({ isOpenModal: true });
  };
  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { isOpenModal } = this.state;
    const { openModal, closeModal } = this;
    const {
      photo: { tags, webformatURL },
    } = this.props;

    return (
      <>
        <li className={css.ImageGalleryItem} onClick={openModal}>
          <img
            className={css['ImageGalleryItem-image']}
            src={webformatURL}
            alt={tags}
            width="200"
          />
        </li>
        <ModalWindow
          onClose={closeModal}
          photo={this.props.photo}
          isOpen={isOpenModal}
        />
      </>
    );
  }
}
