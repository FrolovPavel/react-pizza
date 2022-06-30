import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";

const Index = ({id, imageUrl, title, types, sizes, price}) => {

  const count = useSelector(state => {
    let identicalPizzasId = state.cart.items.filter(item => item.id === id)

    if (!identicalPizzasId.length) {
      return 0
    }

    let countIdenticalPizzasId = identicalPizzasId.reduce((sum, item) => {
      return sum + item.count
    }, 0)

    return countIdenticalPizzasId

  })

  const dispatch = useDispatch()

  const typeDoughList = ['тонкое', 'традиционное']
  const sizeList = ['26см', '30см', '40см']
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      typeDough: typeDoughList[activeType],
      size: sizeList[activeSize]
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block">
      <div className="pizza-block__image">
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
      </div>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map(types => (
            <li
              key={types}
              className={activeType === types ? 'active' : ''}
              onClick={() => setActiveType(types)}
            >
              {typeDoughList[types]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              className={activeSize === index ? 'active' : ''}
              onClick={() => setActiveSize(index)}
            >
              {size} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
};

export default Index;
