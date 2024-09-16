import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodStore = createSlice({
  name: "foods",
  initialState:{
    foodsList: [],
    activeIndex: 0,
    cartList: [],
  },
  reducers:{
    setFoodsList(state, action){
      state.foodsList = action.payload
    },
    setActiveIndex(state, action){
      state.activeIndex = action.payload
    },
    addToCart(state, action){
      // 判断是否添加过商品，无则添加，有则 +1
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item){
        item.count ++
      }else {
        state.cartList.push(action.payload)
      }
    },
    increCount(state, action){
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count ++
    },
    decreCount(state, action){
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item.count === 1){
        state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
      }else{
        item.count --
      }
    },
    clearCart(state){
      state.cartList = []
    }
  }
})

// 异步获取
const { setFoodsList, setActiveIndex, addToCart, increCount, decreCount, clearCart } = foodStore.actions
const fetchFoodsList = () => {
  return async(dispatch) => {
    const res = await axios.get("http://localhost:3004/takeaway")
    dispatch(setFoodsList(res.data))
  }
}

export { fetchFoodsList, setActiveIndex, addToCart, increCount, decreCount, clearCart }

const reducer = foodStore.reducer
export default reducer