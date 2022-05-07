import {INCREMENT,DECREMENT} from "./action_type";

const incrementAction = (value)=>({type:INCREMENT,data:value});
const decrementAction = (value)=>({type:DECREMENT,data:value});
export {incrementAction,decrementAction};