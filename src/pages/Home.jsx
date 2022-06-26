import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://62b5a53eda3017eabb1f580c.mockapi.io/pizzas')
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setPizzas(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
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
