import { Component } from 'react';
import { SearchbarForm } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoadMore } from './Button/Button';
import { fetchPhoto } from './axiosApi';
import { LoadSpinner } from './Loader/Loader';

import css from './App.module.css';

import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    imgTotal: 0,
    state: 'init',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.axiosGetImg(searchValue, page);
    }
  }

  axiosGetImg = async (value, page) => {
    try {
      this.setState({ state: 'pending' });

      const { hits, total } = await fetchPhoto(value, page);

      this.setState(prev => ({
        images: [...prev.images, ...hits],
        imgTotal: total,
        state: 'success',
      }));
    } catch (error) {
      toast.error(`Sorry. ${error.message}. Try again.`);
    }
  };

  getImgSubmit = value => {
    if (value === '') {
      toast.error(`Enter the text.`);
      return;
    }
    this.setState({
      searchValue: `${Date.now()}/${value}`,
      images: [],

      page: 1,
      imgTotal: 0,
      state: 'init',
    });
    toast.dismiss();
  };

  getImgLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, imgTotal, searchValue, state, page } = this.state;
    const { getImgSubmit, getImgLoadMore } = this;

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
  }
}
