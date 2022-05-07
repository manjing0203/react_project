import {INCREMENT,DECREMENT} from './action_type';
let initState = 0; 
export default function operaCount(preState=initState,action) {
  let {type,data} = action;
  let nowState 
  switch (type) {
    case INCREMENT:
      nowState = preState + data;
      return nowState;
    case DECREMENT:
      nowState = preState - data;
      return nowState;
    default:
      return preState;
  }
}