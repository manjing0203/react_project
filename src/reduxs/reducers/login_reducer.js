import {TEST1,TEST2} from '../actions_type';

let initState = 'hello'
export default function operaAction(preState=initState,action) {
  let {type,data} = action;
  let newState
  switch (type) {
    case TEST1:
      newState = preState + data
      return newState;
    case TEST2:
      newState = preState + data +'!'
      return newState;
    default:
      return preState;
  }
}