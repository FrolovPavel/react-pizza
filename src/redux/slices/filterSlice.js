import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {name: 'популярности', sortType: 'rating', direction: 'desc'},
  currentPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    incrementCurrentPage(state) {
      if (state.currentPage < 4) {
        state.currentPage += 1
      }
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    }
  }
})

export const {setCategoryId, setSort, setCurrentPage, incrementCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer
