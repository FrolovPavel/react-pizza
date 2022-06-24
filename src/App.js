import React, {useEffect, useState} from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import './scss/app.scss'

function App() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('https://62b5a53eda3017eabb1f580c.mockapi.io/pizzas')
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setPizzas(arr)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map(pizzaDate => (
              <PizzaBlock key={pizzaDate.id} {...pizzaDate}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
