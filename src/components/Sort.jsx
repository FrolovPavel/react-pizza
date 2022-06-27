import React, {useState} from 'react';
import {Transition} from 'react-transition-group';

const Sort = ({value, onChangeSort}) => {
  const [open, setOpen] = useState(false)
  const [isChangeSelectText, setIsChangeSelectText] = useState(false)

  const sortList = [
    {name: 'популярности', sortType: 'rating', direction: 'desc'},
    {name: 'возростанию цены', sortType: 'price', direction: 'asc'},
    {name: 'убыванию цены', sortType: 'price', direction: 'desc'},
    {name: 'алфавиту (от A до Я)', sortType: 'title', direction: 'asc'},
    {name: 'алфавиту (от Я до А)', sortType: 'title', direction: 'desc'},
  ]

  const sortItemHandler = (index) => {
    onChangeSort(index)
    setOpen(false)
    setIsChangeSelectText(!isChangeSelectText)
    setIsChangeSelectText(!isChangeSelectText)
  }

  return (
    <div onClick={() => setOpen(!open)} className="sort">
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
        <Transition
          in={isChangeSelectText}
          timeout={150}
        >
          {state => <span className={state}>{value.name}</span>}
        </Transition>
      </div>
      <Transition
        in={open}
        timeout={150}
      >
        {state => <div className={`sort__popup ${state}`}>
          <ul>
            {sortList.map((sortItem, index) => (
              <li
                className={value.name === sortItem.name ? 'active' : ''}
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
