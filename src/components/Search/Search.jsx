import React, {useContext} from 'react';
import SearchIcon from "../../assets/Icon/SearchIcon";
import styles from './Search.module.scss'
import classnames from "classnames";
import CloseIcon from "../../assets/Icon/CloseIcon";
import {SearchContext} from "../../App";

const Search = () => {

  const {searchValue, setSearchValue} = useContext(SearchContext)

  return (
    <div className={styles.search}>
      <SearchIcon className={classnames(styles.icon, styles.icon_search)}/>
      {searchValue &&
        <CloseIcon
          onClick={() => setSearchValue('')}
          className={classnames(styles.icon, styles.icon_clear)}
        />}
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder='Поиск пиццы...'
        value={searchValue}
      />
    </div>

  );
};

export default Search;
