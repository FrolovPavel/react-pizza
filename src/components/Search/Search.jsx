import React, {useContext, useRef} from 'react';
import SearchIcon from "../../assets/Icon/SearchIcon";
import styles from './Search.module.scss'
import classnames from "classnames";
import CloseIcon from "../../assets/Icon/CloseIcon";
import {setCurrentPage, setCategoryId} from "../../redux/slices/filterSlice";
import {useDispatch} from "react-redux";
import {SearchContext} from "../../App";

const Search = () => {
  const dispatch = useDispatch()

  const {searchValue, setSearchValue} = useContext(SearchContext)
  const inputRef = useRef()

  const onClearInputHandler = () => {
    setSearchValue('')
    inputRef.current.focus()
    dispatch(setCurrentPage(1))
  }

  const onChangeInputHandler = (event) => {
    setSearchValue(event.target.value)
    dispatch(setCurrentPage(1))
    dispatch(setCategoryId(0))
  }

  return (
    <div className={styles.search}>
      <SearchIcon className={classnames(styles.icon, styles.icon_search)}/>
      {searchValue &&
        <CloseIcon
          onClick={onClearInputHandler}
          className={classnames(styles.icon, styles.icon_clear)}
        />}
      <input
        onChange={onChangeInputHandler}
        className={styles.input}
        placeholder='Поиск пиццы...'
        value={searchValue}
        ref={inputRef}
      />
    </div>

  );
};

export default Search;
