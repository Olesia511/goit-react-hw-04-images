import { CardPhoto } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ arrImages }) => {
  return (
    <ul className={css.ImageGallery}>
      {arrImages.map(el => (
        <CardPhoto key={el.id} photo={el} />
      ))}
    </ul>
  );
};
