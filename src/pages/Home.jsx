import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sort, setSort] = useState({name: 'популярности', sortType: 'rating', direction: 'desc'})

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://62b5a53eda3017eabb1f580c.mockapi.io/pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortType}&order=${sort.direction}`)
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setTimeout(() => {
          setPizzas(arr)
          setIsLoading(false)
        }, 250)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sort])

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategoryId(index)}/>
        <Sort value={sort} onChangeSort={(index) => setSort(index)}/>
      </div>
      <h1 className="content__title">Все пиццы</h1>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
            : pizzas.map(pizzaDate => <PizzaBlock key={pizzaDate.id} {...pizzaDate}/>)
        }
      </div>
    </>
  );
};

export default Home;
