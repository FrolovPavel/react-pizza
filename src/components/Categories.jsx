import React, {useState} from 'react';

const Categories = ({value, onClickCategory}) => {

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]


  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li onClick={() => onClickCategory(index)}
              className={value === index ? 'active' : ''}
              key={index}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
