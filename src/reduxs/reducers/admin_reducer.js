import {DEMO1,DEMO2} from '../actions_type';

let initState = 'hi'
export default function operaAction(preState=initState,action) {
  let {type,data} = action;
  let newState
  switch (type) {
    case DEMO1:
      newState = preState + data +'?'
      return newState;
    case DEMO2:
      newState = preState + data +'%'
      return newState;
    default:
      return preState;
  }
}