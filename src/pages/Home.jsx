import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {SearchContext} from "../App";

const Home = () => {

  const {searchValue} = useContext(SearchContext)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sort, setSort] = useState({name: 'популярности', sortType: 'rating', direction: 'desc'})
  const [isObserve, setIsObserve] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((currentPage) => currentPage + 1)
        console.log(currentPage, 'peresek')
      }
    }

    const observer = new IntersectionObserver(callback);

    console.log(isObserve, 'isObserve')
    const startObserve = () => {
      if (!isObserve) {
        observer.observe(document.querySelector('.observer'))
        setIsObserve(true)
      }
    }

    const category = categoryId ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const scrollPagination = searchValue ? '' : `&page=${currentPage}&limit=4`

    fetch(`https://62b5a53eda3017eabb1f580c.mockapi.io/pizzas?${category}&sortBy=${sort.sortType}&order=${sort.direction}${search}${scrollPagination}`)
      .then((res) => {
        return res.json()
      })
      .then((arr) => {

        if (!arr.length) {
          observer.unobserve(document.querySelector('.observer'))
        }

        if (searchValue) {
          setPizzas(arr)
        } else {
          if (currentPage === 1) {
            setPizzas(arr)
            window.scrollTo(0, 0)
          } else {
            setPizzas(() => {
              return [
                ...pizzas,
                ...arr
              ]
            })
          }
        }


        setIsLoading(false)
        startObserve()
      })
  }, [categoryId, sort, searchValue, currentPage])


  const pizza = pizzas.map(pizzaDate => <PizzaBlock key={pizzaDate.id} {...pizzaDate}/>)

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  const onClickCategoryHandler = (index) => {
    setCategoryId(index)
    setCurrentPage(1)
  }

  const onChangeSortHandler = (index) => {
    setSort(index)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => onClickCategoryHandler(index)}/>
        <Sort value={sort} onChangeSort={(index) => onChangeSortHandler(index)}/>
      </div>
      <h1 className="content__title">Все пиццы</h1>
      <div className="content__items">
        {
          isLoading
            ? skeleton
            : pizza
        }
      </div>
      <div className="observer"></div>
    </>
  );
};

export default Home;
