import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setCategoryId, setCurrentPage, incrementCurrentPage, setFilters} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import qs from 'qs'

import {SearchContext} from "../App";

const Home = () => {
  const {categoryId, sort, currentPage} = useSelector(state => state.filters)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const {searchValue} = useContext(SearchContext)

  const observerRef = useRef()
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isObserve, setIsObserve] = useState(true)

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(sortItem => {
        if (sortItem.sortType === params.sort && sortItem.direction === params.order) {
          return sortItem
        }
      })

      dispatch(setFilters({
        ...params,
        sort
      }))

      isSearch.current = true
    }
  }, [])

  const fetchPizzas = () => {
    const api = 'https://62b5a53eda3017eabb1f580c.mockapi.io/pizzas?'
    const search = searchValue ? `&search=${searchValue}` : ''
    const category = categoryId && !searchValue ? `category=${categoryId}` : ''
    const scrollPagination = searchValue ? '' : `&page=${currentPage}&limit=4`

    axios.get(
      `${api}${category}&sortBy=${sort.sortType}&order=${sort.direction}${search}${scrollPagination}`
    )
      .then(response => {
        if (searchValue) {
          setPizzas(response.data)
        } else {
          if (currentPage === 1) {
            setPizzas(response.data)
            window.scrollTo(0, 0)
          } else {
            setPizzas(() => {
              return [
                ...pizzas,
                ...response.data
              ]
            })
          }
        }
        startObservBottomPage()
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false

  }, [categoryId, sort, searchValue, currentPage])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortType,
        order: sort.direction,
        categoryId,
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sort, searchValue, currentPage])

  const startObservBottomPage = () => {
    const observer = new IntersectionObserver(function (entries, observer) {
      if (entries[0].isIntersecting) {
        dispatch(incrementCurrentPage())
      }
    });

    if (isObserve) {
      observer.observe(observerRef.current)
      setIsObserve(false)
    }
  }


  const pizza = pizzas.map(pizzaDate => <PizzaBlock key={pizzaDate.id} {...pizzaDate}/>)

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  const onClickCategoryHandler = (index) => {
    dispatch(setCategoryId(index))
    dispatch(setCurrentPage(1))
  }

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => onClickCategoryHandler(index)}/>
        <Sort/>
      </div>
      <h1 className="content__title">Все пиццы</h1>
      <div className="content__items">
        {
          isLoading
            ? skeleton
            : pizza
        }
      </div>
      <div ref={observerRef} className="observer"></div>
    </>
  );
};

export default Home;
