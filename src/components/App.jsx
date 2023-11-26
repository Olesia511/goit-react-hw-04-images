import { useState, useEffect } from 'react';
import { SearchbarForm } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoadMore } from './Button/Button';
import { fetchPhoto } from './axiosApi';
import { LoadSpinner } from './Loader/Loader';

import css from './App.module.css';

import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [state, setState] = useState('init');
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [imgTotal, setImgTotal] = useState(0);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    axiosGetImg(searchValue, page);
  }, [searchValue, page]);

  const axiosGetImg = async (value, page) => {
    try {
      setState('pending');

      const { hits, total } = await fetchPhoto(value, page);

      setImages(prev => [...prev, ...hits]);
      setImgTotal(total);
      setState('success');
    } catch (error) {
      toast.error(`Sorry. ${error.message}. Try again.`);
    }
  };

  const getImgSubmit = value => {
    if (value === '') {
      toast.error(`Enter the text.`);
      return;
    }
    setSearchValue(`${Date.now()}/${value}`);
    setState('init');
    setImages([]);
    setPage(1);
    setImgTotal(0);

    toast.dismiss();
  };

  const getImgLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.App}>
      <SearchbarForm onSubmit={getImgSubmit} />

      {state === 'success' && <ImageGallery arrImages={images} />}
      {imgTotal > images.length && <BtnLoadMore onClick={getImgLoadMore} />}

      {state === 'pending' && <LoadSpinner />}
      {searchValue !== '' &&
        imgTotal > 0 &&
        images.length === imgTotal &&
        toast.loading(`No more images`)}

      {state === 'success' &&
        page === 1 &&
        toast.success(`Find ${imgTotal} images`)}

      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 2000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
};
