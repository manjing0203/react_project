import {INCREMENT,DECREMENT} from "../action_type";

const incrementAction = (value)=>({type:INCREMENT,data:value});
const decrementAction = (value)=>({type:DECREMENT,data:value});
const incrementAsyncAction = (value,delay)=>{
  return (dispatch)=>{
    setTimeout(() => {
      dispatch(incrementAction(value))
    }, delay);
  }
}
export {incrementAction,decrementAction,incrementAsyncAction};