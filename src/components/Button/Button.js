import css from './Button.module.css';
export const BtnLoadMore = ({ onClick }) => {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};
