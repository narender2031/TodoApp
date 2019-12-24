import React from 'react';
import {Searchbar} from 'react-native-paper';

const SearchBar = ({searchPlaceHolder, searchQuery, searchValue}) => {
  return (
    <Searchbar
      placeholder={searchPlaceHolder}
      onChangeText={value => searchQuery(value)}
      value={searchValue}
      icon={{
        uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
      }}
    />
  );
};
export default SearchBar;
