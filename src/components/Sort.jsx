import React, {useEffect, useRef, useState} from 'react';
import {Transition} from 'react-transition-group';
import {useSelector, useDispatch} from "react-redux";
import {setSort, setCurrentPage} from "../redux/slices/filterSlice";

export const sortList = [
  {name: 'популярности', sortType: 'rating', direction: 'desc'},
  {name: 'возростанию цены', sortType: 'price', direction: 'asc'},
  {name: 'убыванию цены', sortType: 'price', direction: 'desc'},
  {name: 'алфавиту (от A до Я)', sortType: 'title', direction: 'asc'},
  {name: 'алфавиту (от Я до А)', sortType: 'title', direction: 'desc'},
]

const Sort = () => {

  const sort = useSelector(state => state.filters.sort)
  const dispatch = useDispatch()
  const sortRef = useRef()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.addEventListener("click", outsideClickHandler)

    return () => document.body.removeEventListener('click', outsideClickHandler)
  }, [])

  const sortItemHandler = (sortItem) => {
    dispatch(setSort(sortItem))
    dispatch(setCurrentPage(1))
    setOpen(false)
  }

  const outsideClickHandler = (event) => {
    if (!event.path.includes(sortRef.current)) {
      setOpen(false)
    }
  }


  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={`sort__icon ${open && 'active'}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      <Transition
        in={open}
        timeout={150}
      >
        {state => <div className={`sort__popup ${state}`}>
          <ul>
            {sortList.map((sortItem, index) => (
              <li
                className={sort.name === sortItem.name ? 'active' : ''}
                key={index}
                onClick={() => sortItemHandler(sortItem)}
              >
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>}
      </Transition>
    </div>
  );
};

export default Sort;
