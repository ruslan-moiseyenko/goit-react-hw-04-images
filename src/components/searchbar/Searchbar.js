import PropTypes from 'prop-types';
import { useState } from 'react';
import { SearchForm, SearchFormButton, SearchFormInput } from './searchbar.sytled';


export default function SearchBar({ onSubmit }) {
  const baseURL = 'https://pixabay.com/api/?key=25600695-4ceee91aa58c1079792de0ba1&image_type=photo&';


  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    let normalizedQuery = searchQuery.trim().toLowerCase().split(' ').join('+');
    onSubmit(baseURL, normalizedQuery);

  }

  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };


  return (
    <header >
      <SearchForm onSubmit={searchHandler}>
        <SearchFormButton type="submit" className="button">
          <span >Search</span>
        </SearchFormButton>

        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </header>
  );

}



SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
