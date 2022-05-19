import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import leftNavReducer from './leftNav_reducer'
import productReducer from './product_reducer'
import categoryReducer from './category_reducer'

 export default combineReducers({
  userInfo:loginReducer,
  title:leftNavReducer,
  productInfo:productReducer,
  categoryList:categoryReducer
})