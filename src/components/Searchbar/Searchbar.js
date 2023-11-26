import { Formik, Form, Field } from 'formik';

import { RiAddCircleFill } from 'react-icons/ri';
import css from './Searchbar.module.css';

export const SearchbarForm = ({ onSubmit }) => (
  <div>
    <header className={css.Searchbar}>
      <Formik
        initialValues={{
          textSearch: '',
        }}
        onSubmit={(initialValues, actions) => {
          const value = initialValues.textSearch.trim();

          onSubmit(value);

          actions.resetForm();
        }}
      >
        <Form className={css.SearchForm}>
          <button className={css['SearchForm-button']} type="submit">
            <span className={css['SearchForm-button-label']}>
              <RiAddCircleFill className={css['SearchForm-button-icon']} />
            </span>
          </button>

          <Field
            className={css['SearchForm-input']}
            name="textSearch"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  </div>
);
