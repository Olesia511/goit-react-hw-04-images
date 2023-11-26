import css from './Loader.module.css';
import { InfinitySpin } from 'react-loader-spinner';

export const LoadSpinner = () => (
  <div className={css.ContainerLoad}>
    <InfinitySpin width="300" color="#8B9D77" />
  </div>
);
