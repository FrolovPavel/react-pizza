import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(item => {
        return item.id === action.payload.id
          && item.typeDough === action.payload.typeDough
          && item.size === action.payload.size
      })
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    decrementItem(state, action) {
      const findItem = state.items.find(item => {
        return item.id === action.payload.id
          && item.typeDough === action.payload.typeDough
          && item.size === action.payload.size
      })
      if (findItem.count > 1) {
        findItem.count--
        state.totalCount--
        state.totalPrice = state.items.reduce((sum, item) => {
          return item.price * item.count + sum
        }, 0)
      }
    },
    removeItem(state, action) {
      const findItemIndex = state.items.findIndex(item => {
        return item.id === action.payload.id
          && item.typeDough === action.payload.typeDough
          && item.size === action.payload.size
      })
      state.items.splice(findItemIndex, 1)
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalCount = 0
      state.totalPrice = 0
    }
  }
})

export const {addItem, removeItem, clearItems, decrementItem} = cartSlice.actions

export default cartSlice.reducer
